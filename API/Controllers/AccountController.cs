using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain.Enums;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Enums;
using Domain.AppUserAggregate.Objects;
using Domain.CompanyAggregate;
using Domain.CompanyAggregate.Objects;
using Domain.ListingAggregate.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.ProfileApplication.ProfileDtos;
using API.Extensions;
using AutoMapper.QueryableExtensions;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        // we are not using Mediator for this aspect of the app, its too much boilerplate
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly DataContext _context;
        private readonly PaymentService _paymentService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService,
        RoleManager<IdentityRole> roleManager, DataContext context, PaymentService paymentService)
        {
            _paymentService = paymentService;
            _context = context;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [AllowAnonymous] // the enpoint here can be accessed anonymously when a user is trying to login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email); // if in doubt, check the database to see what a Normalized Email Address is

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous] // the enpoint here can be accessed anonymously when a new user is trying to register
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email.ToLower()))
            {
                // manually add validation errors
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == registerDto.Username.ToLower()))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDto.Email.ToLower(),
                UserName = registerDto.Username.ToLower(),
                PhoneNumber = registerDto.PhoneNumber,
                AccountType = registerDto.AccountType,
                AddedOn = DateTime.UtcNow,
                Country = registerDto.Country,
                Language = registerDto.Language,
                DisplayName = registerDto.DisplayName,
            };

            if (registerDto.AccountType == AccountType.Agent)
            {
                var companyContacts = new CompanyContacts
                {
                    Email = registerDto.Email,
                    Phone = registerDto.PhoneNumber
                };

                var company = new Company
                {
                    Username = registerDto.Username,
                    AccessStatus = registerDto.CompanyAccessStatus,
                    AddedOn = registerDto.AddedOn,
                    CompanyContacts = companyContacts,
                    LegalName = registerDto.CompanyLegalName,
                    DisplayName = registerDto.DisplayName,
                    IsMain = registerDto.IsMainCompany,
                    CompanyAddress = registerDto.LegalCompanyAddress
                };

                var items = new List<InvoiceItem>();
                var invoiceItem = new InvoiceItem
                {
                    Amount = registerDto.InvoiceAmount,
                    Currency = registerDto.InvoiceCurrency,
                    Description = "",
                    Title = "Property Agent Sign Up fee",
                    VatPercentage = 20
                };
                items.Add(invoiceItem);

                var invoice = new Invoice
                {
                    Amount = registerDto.InvoiceAmount,
                    Currency = registerDto.InvoiceCurrency,
                    Description = registerDto.InvoiceDescription,
                    InvoiceDate = DateTime.UtcNow,
                    InvoiceNumber = 1,
                    Items = items,
                    PaymentStatus = PaymentStatus.InProgress,
                    Title = "Property Agent Sign Up fee",
                    Username = registerDto.Username,
                    VatPercentage = 20
                };

                var membership = new Membership
                {
                    Description = "Property Agent Membership",
                    Expiry = DateTime.MaxValue,
                    IsActive = false,
                    MemberSince = DateTime.UtcNow
                };

                user.Invoices.Add(invoice);
                user.Membership = membership;

                await _context.Companies.AddAsync(company);
                await CreateOrUpdatePaymentIntent(invoice);
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (registerDto.AccountType == AccountType.Customer) await _userManager.AddToRoleAsync(user, "Customer");
            if (registerDto.AccountType == AccountType.Agent) await _userManager.AddToRoleAsync(user, "Agency");
            if (registerDto.AccountType == AccountType.Company) await _userManager.AddToRoleAsync(user, "Company");


            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        private async Task<ActionResult<InvoiceDto>> CreateOrUpdatePaymentIntent(Invoice invoice)
        {
            if (invoice == null) return NotFound();

            // create payment intent
            var intent = await _paymentService.CreateOrUpdatePaymentIntent(invoice);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
            invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

            _context.Update(invoice);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

            return invoice.MapInvoiceToDto();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            // var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return await CreateUserObject(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.OrderByDescending(x => x.UserName).ToListAsync();
            List<UserDto> userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var userDto = await CreateUserObject(user);
                userDtos.Add(userDto);
            }
            return userDtos;
        }

        // check whether or not username is taken
        [AllowAnonymous]
        [HttpGet("username/{username}")]
        public async Task<ActionResult<PublicUserDto>> GetUserByUsername(string username)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower()))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            return Ok("Username available");
        }

         // check whether or not email is taken
        [AllowAnonymous]
        [HttpGet("email/{email}")]
        public async Task<ActionResult<PublicUserDto>> GetUserByEmail(string email)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == email.ToLower()))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            
            return Ok("Email available");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("assignrole")]
        public async Task<ActionResult<UserDto>> AddToRole(AssignRoleDto assignRoleDto)
        {
            var user = await _userManager.FindByNameAsync(assignRoleDto.Username);
            await _userManager.AddToRoleAsync(user, assignRoleDto.Role);

            return await CreateUserObject(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser(AssignRoleDto assignRoleDto)
        {
            var user = await _userManager.FindByNameAsync(assignRoleDto.Username);

            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                    return Ok();
                else
                    return BadRequest(new ProblemDetails { Title = "Problem deleting the user" });
            }
            else
                ModelState.AddModelError("", "User Not Found");
            return Ok();
        }


        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                AccountType = user.AccountType,
                Token = await _tokenService.CreateToken(user),
                Username = user.UserName,
                Email = user.Email,
                Role = _userManager.GetRolesAsync(user).Result.ToList(),
                PhoneNumber = user.PhoneNumber,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Country = user.Country,
                AddedOn = user.AddedOn,
                Language = user.Language

            };
        }
    }
}