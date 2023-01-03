using System;
using System.Collections.Generic;
using Domain.Enums;
using Domain.ListingAggregate.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class InvoiceDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public Currency Currency { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int InvoiceNumber { get; set; }
        public ICollection<InvoiceItemDto> Items { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }

        // buyer id navigation property
        public string AppUserId { get; set; }

        // for stripe integration
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

    }
}