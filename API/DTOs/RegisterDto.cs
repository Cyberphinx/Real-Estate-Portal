using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain;

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
        public bool Agency { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyPostalCode { get; set; }
        public RedressScheme RedressScheme { get; set; }
        public Membership Membership { get; set; }
    
    }
}