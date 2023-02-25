using System;
using System.Collections.Generic;
using Domain.Enums;
using Domain.ListingAggregate.Enums;

namespace Application.JobInvoiceApplication.JobInvoiceDtos
{
    public class JobInvoiceDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }

        // ISO 3-Letter Currency Code in lowercase
        public string Currency { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int Index { get; set; }
        public bool IsQuotation { get; set; }
        public ICollection<JobInvoiceItemDto> Items { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }

        // for stripe integration
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        // navigation
        public Guid JobId { get; set; }
        public string SellerUsername { get; set; }
    }
}