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
        public string DisplayName { get; set; }
        public string Token { get; set; } // used to authenticate the user
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<string> Role { get; set; }
        public string Image { get; set; }
        
    }
}