using System;

namespace Application.ProfileApplication.ProfileDtos
{
    public class InvoiceItemDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }
    }
}