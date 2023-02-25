using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.InvoiceAggregate;

namespace Domain.JobAggregate.Objects
{
    public class JobInvoiceItem : InvoiceItem
    {
        public Guid Id { get; set; }
        public Guid JobInvoiceId { get; set; }
        public JobInvoice JobInvoice { get; set; }
    }
}