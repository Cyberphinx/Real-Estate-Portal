using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate;
using Domain.Enums;

namespace Domain.AppUserAggregate.Objects
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string ClientSecret { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int InvoiceNumber { get; set; }
        public ICollection<InvoiceItem> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string Title { get; set; }
        public string Username { get; set; }
        public long VatPercentage { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}