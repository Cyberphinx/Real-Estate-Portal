using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppUserAggregate.Enums;
using Domain.LocationAggregate;

namespace Application.AccountApplication.AccountDtos
{
    public class PublicUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        
    }
}