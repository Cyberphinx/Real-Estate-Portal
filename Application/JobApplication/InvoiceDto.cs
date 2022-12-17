using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.JobApplication
{
    public class InvoiceDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int InvoiceNumber { get; set; }
        public ICollection<InvoiceItemDto> Items { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }

    }
}