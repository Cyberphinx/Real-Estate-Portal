using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Domain.CompanyAggregate
{
    [Owned]
    public class CompanyContacts
    {
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
    }
}