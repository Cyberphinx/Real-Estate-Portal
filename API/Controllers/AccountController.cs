using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService,
        RoleManager<IdentityRole> roleManager)
        {
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
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                // manually add validation errors
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                PhoneNumber = registerDto.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (registerDto.AccountType == AccountType.Agent) await _userManager.AddToRoleAsync(user, "Agency");
            if (registerDto.AccountType == AccountType.Company) await _userManager.AddToRoleAsync(user, "Company");
            else await _userManager.AddToRoleAsync(user, "Customer");

            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

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
                Token = await _tokenService.CreateToken(user),
                Username = user.UserName,
                Email = user.Email,
                Role = _userManager.GetRolesAsync(user).Result.ToList(),
                PhoneNumber = user.PhoneNumber,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url
            };
        }
    }
}