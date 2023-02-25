using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Domain.InvoiceAggregate
{
    public class InvoiceItem
    {
        public int Index { get; set; }
        public long Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }
    }
}