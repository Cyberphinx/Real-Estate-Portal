using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.OrderApplication
{
    public class InvoiceDto
    {
        public Guid Id { get; set; }
        // public DateTime InvoiceDate { get; set; }
        public ICollection<InvoiceItemDto> Items { get; set; }
        // public string PaymentIntentId { get; set; }
        // public string ClientSecret { get; set; }
        // public long TotalNet { get; set; }
        // public long TotalVat { get; set; }
        public long Total { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public Guid OrderId { get; set; }
    }
}