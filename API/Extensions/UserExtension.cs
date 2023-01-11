using System;
using System.Linq;
using Application.AccountApplication.AccountDtos;
using Application.ProfileApplication.ProfileDtos;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Objects;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserExtensions
    {
        public static PublicUserDto MapUserToDto(this AppUser user)
        {
            return new PublicUserDto
            {
                Username = user.UserName,
                Email = user.Email
            };
        }
    }
}