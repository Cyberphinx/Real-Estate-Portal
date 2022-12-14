using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate.Enums;
using Domain.InvoiceAggregate;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    public class Membership
    {
        public Guid Id { get; set; }
        public string CompanyReference { get; set; }
        public int ContractLength { get; set; }
        public DateTime MemberSince { get; set; }
        public DateTime Expiry { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
        public bool IsActive { get; set; }
        public UnitOfTime Unit { get; set; }
        public string Username { get; set; }
        public long VatPercentage { get; set; }
    }
}