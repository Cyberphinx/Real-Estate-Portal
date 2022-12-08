using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.InvoiceAggregate
{
    public class InvoiceItem
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public long VatPercentage { get; set; }
        public long Vat { get; set; }
        public long Total { get; set; }
        public Guid InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
    }
}