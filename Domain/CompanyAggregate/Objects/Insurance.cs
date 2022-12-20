using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.CompanyAggregate.Enums;

namespace Domain.CompanyAggregate.Objects
{
    public class Insurance
    {
        public Guid Id { get; set; }
        public InsuranceType Type { get; set; }
        public string Provider { get; set; }
        public string PolicyNumber { get; set; }
        public string IndemnityLimit { get; set; }
        public DateTime Expiry { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}