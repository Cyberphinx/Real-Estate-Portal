using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Domain.Enums;

namespace Domain.InvoiceAggregate
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }

        // ISO 3-Letter Currency Code in lowercase
        public string Currency { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int InvoiceNumber { get; set; }
        public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
        public PaymentStatus PaymentStatus { get; set; }
        public string Title { get; set; }
        public string Username { get; set; }
        public string JobReference { get; set; }
        public long VatPercentage { get; set; }
        
        // for stripe integration -  create a payment intent before allowing the client to pay
        public string PaymentIntentId { get; set; }

        // for stripe integration -  client secret will be passed back to the client, who will use it to make payment to stripe directly
        public string ClientSecret { get; set; }
    }
}