using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Services;
using Domain.Enums;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Enums;
using Domain.AppUserAggregate.Objects;
using Domain.CompanyAggregate;
using Domain.CompanyAggregate.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.ProfileApplication.ProfileDtos;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Infrastructure.Email;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using Domain;
using Application.AccountApplication;
using Application.AccountApplication.AccountDtos;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        // we are not using Mediator for this aspect of the app, its too much boilerplate
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly DataContext _context;
        private readonly PaymentService _paymentService;
        private readonly EmailService _emailService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService,
        RoleManager<IdentityRole> roleManager, DataContext context, PaymentService paymentService, EmailService emailService)
        {
            _emailService = emailService;
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

            if (user == null) return Unauthorized("Invalid email");

            if (user.Email == "info@sanctum.co.uk") user.EmailConfirmed = true;
            if (user.UserName == "hunters") user.EmailConfirmed = true;
            if (user.UserName == "tom") user.EmailConfirmed = true;

            if (!user.EmailConfirmed) return Unauthorized("Email not confirmed");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return await CreateUserObject(user);
            }

            return Unauthorized("Invalid password");
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
                    CompanyAddress = registerDto.LegalCompanyAddress,
                    CompanyRegistrationNumber = registerDto.CompanyNumber,
                    IcoRegistrationNumber = registerDto.IcoNumber,
                    RedressScheme = registerDto.RedressScheme
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


            // Below is for non-email-verification
            // if (result.Succeeded)
            // {
            //     await SetRefreshToken(user);
            //     return await CreateUserObject(user);
            // }

            // return BadRequest("Problem registering user");


            // Below is for email verification
            if (!result.Succeeded) return BadRequest("Problem registering user");

            var origin = Request.Headers["origin"];
            // var origin = "https://localhost:5000/api";
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address for Sanctum:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            // SendinBlue
            var verificationEmail = new EmailDto
            {
                RecipientName = user.UserName,
                RecipientEmail = user.Email,
                RecipientPhone = user.PhoneNumber,
                Subject = "Please verify email for Sanctum",
                Body = message,
                AccountType = user.AccountType
            };
            await _emailService.SendEmailAsync(verificationEmail);

            return Ok("Registration success - please verify email");
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Could not verify email address");

            return Ok("Email confirmed - you can now login");
        }

        [AllowAnonymous]
        [HttpGet("resendVerifyLink")]
        public async Task<IActionResult> ResendVerifyLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();

            var origin = Request.Headers["origin"];
            // var origin = "https://localhost:5000/api";
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            // SendinBlue
            var verificationEmail = new EmailDto
            {
                RecipientName = user.UserName,
                RecipientEmail = user.Email,
                Subject = "Please verify email",
                Body = message
            };
            await _emailService.SendEmailAsync(verificationEmail);

            return Ok("Email verification link resent");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);
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

        [Authorize(Roles = "Admin")]
        [HttpGet("activate")]
        public async Task<IActionResult> ActivateAccount(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return BadRequest("User does not exist");

            var companies = await _context.Companies.Where(x => x.Username == username).ToListAsync();
            if (companies == null) return BadRequest("User does not have any companies");

            user.Membership.IsActive = true;

            foreach (var company in companies)
            {
                company.AccessStatus = AccessStatus.Public;
            }

            return Ok("User and their companies have been activated");
        }

        // check whether or not username is taken
        [AllowAnonymous]
        [HttpGet("username/{username}")]
        public async Task<ActionResult<PublicUserDto>> CheckUsernameTaken(string username)
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
        public async Task<ActionResult<PublicUserDto>> CheckEmailTaken(string email)
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
        public async Task<IActionResult> DeleteUser(string username)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Username = username }));
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken != null && !oldToken.IsActive) return Unauthorized();

            return await CreateUserObject(user);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }


        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                AccountType = user.AccountType,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = _userManager.GetRolesAsync(user).Result.ToList(),
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Country = user.Country,
                Language = user.Language,
                AddedOn = user.AddedOn
            };
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
    }
}