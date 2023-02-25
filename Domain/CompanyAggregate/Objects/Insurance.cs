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
        public string Currency { get; set; } 
        public int Index { get; set; }
        public string InsurancePolicy { get; set; } // ie. download url of the policy pdf
        public string InsuranceScheme { get; set; } // ie. ClientMoneyProtect, Propertymark, RICS, etc.
        public string InsuranceType { get; set; } // ie. Public Liability, Professional Indemnity, Client Money Protection, etc.
        public string Provider { get; set; } // ie. AXA, Allianz, etc.
        public string PolicyNumber { get; set; } 
        public string IndemnityLimit { get; set; } // aka total sum insured
        public DateTime Expiry { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}