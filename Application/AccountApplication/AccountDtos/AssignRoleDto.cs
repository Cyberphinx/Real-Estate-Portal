using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.AccountApplication.AccountDtos
{
    public class AssignRoleDto
    {
        [Required]
        public string Username { get; set; }
        public string Role { get; set; }
    }
}