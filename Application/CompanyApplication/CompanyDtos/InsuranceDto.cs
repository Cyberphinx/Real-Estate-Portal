using System;
using Domain.CompanyAggregate.Enums;

namespace Application.CompanyApplication.CompanyDtos
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