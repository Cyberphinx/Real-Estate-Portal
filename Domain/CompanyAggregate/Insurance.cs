using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.CompanyAggregate
{
    public class Insurance
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Insurer { get; set; }
        public string Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}