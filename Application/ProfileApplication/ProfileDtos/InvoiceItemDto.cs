using System;
using Domain.ListingAggregate.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class InvoiceItemDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }
    }
}