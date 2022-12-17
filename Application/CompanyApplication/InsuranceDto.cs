using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.CompanyAggregate.Enums;

namespace Application.CompanyApplication
{
    public class InsuranceDto
    {
        public Guid Id { get; set; }
        public InsuranceType Type { get; set; }
        public string Provider { get; set; }
        public string PolicyNumber { get; set; }
        public string IndemnityLimit { get; set; }
        public DateTime Expiry { get; set; }
    }
}