using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.OrderAggregate;

namespace Domain.InvoiceAggregate
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public int InvoiceNumber { get; set; }
        public string Username { get; set; }
        public DateTime InvoiceDate { get; set; }
        public ICollection<InvoiceItem> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public long TotalNet { get; set; }
        public long TotalVat { get; set; }
        public long Total { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
    }
}