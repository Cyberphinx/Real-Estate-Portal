using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public DateTime LastLoginTime { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyPostalCode { get; set; }
        public RedressScheme RedressScheme { get; set; }
        public Membership Membership { get; set; }
    }
}