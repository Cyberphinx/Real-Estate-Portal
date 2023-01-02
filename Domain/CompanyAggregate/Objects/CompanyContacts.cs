using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Domain.CompanyAggregate.Objects
{
    public class CompanyContacts
    {
        public Guid Id { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}