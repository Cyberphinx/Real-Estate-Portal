using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate.Enums;
using Domain.InvoiceAggregate;
using Domain.ListingAggregate.Enums;
using Domain.MembershipAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    public class Membership
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string CompanyReference { get; set; }
        public int ContractLength { get; set; }
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public double Price { get; set; }
        public UnitOfTime Unit { get; set; }
        public double ComissionPercentage { get; set; }
        public string Description { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
    }
}