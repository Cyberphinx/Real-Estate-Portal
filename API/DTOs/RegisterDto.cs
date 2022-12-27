using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppUserAggregate.Enums;
using Domain.LocationAggregate;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public AccountType AccountType { get; set; }
        public DateTime AddedOn { get; set; }
        public Country Country { get; set; }
        public Language Language { get; set; }
    }
}