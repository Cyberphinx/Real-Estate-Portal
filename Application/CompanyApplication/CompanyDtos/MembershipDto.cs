using System;
using Domain.Enums;

namespace Application.CompanyApplication.CompanyDtos
{
    public class MembershipDto
    {
        public Guid Id { get; set; }
        public int ContractLength { get; set; }
        public string Description { get; set; }
        public DateTime Expiry { get; set; }
        public bool IsActive { get; set; }
        public DateTime MemberSince { get; set; }
        public long Price { get; set; }
        public UnitOfTime Unit { get; set; }
        public long VatPercentage { get; set; }
    }
}