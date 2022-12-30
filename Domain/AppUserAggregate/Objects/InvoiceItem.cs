using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.AppUserAggregate.Objects
{
    public class InvoiceItem
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }
        public Guid InvoiceId { get; set; }
        public Invoice Invoice { get; set; }

    }
}