using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace API.DTOs
{
    public class UserDto
    {
        // information that are returned to the user once they have logged in
        public string Token { get; set; } // used to authenticate the user
        public string Username { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public ICollection<string> Role { get; set; }
        public DateTime LastLoginTime { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyPostalCode { get; set; }
        public RedressScheme RedressScheme { get; set; }
        public Membership Membership { get; set; }
        
    }
}