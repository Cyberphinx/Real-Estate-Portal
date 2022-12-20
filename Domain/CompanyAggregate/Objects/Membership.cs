using System;
using Domain.Enums;

namespace Domain.CompanyAggregate.Objects
{
    public class Membership
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
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}