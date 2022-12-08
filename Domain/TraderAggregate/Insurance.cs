using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Insurance
    {
        public Guid Id { get; set; }
        public InsuranceType Type { get; set; }
        public string Provider { get; set; }
        public string PolicyNumber { get; set; }
        public double IndemnityLimit { get; set; }
        public DateTime Expiry { get; set; }
    }
}