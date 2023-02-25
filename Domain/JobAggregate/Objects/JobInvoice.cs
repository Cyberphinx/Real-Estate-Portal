using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.InvoiceAggregate;

namespace Domain.JobAggregate.Objects
{
    public class JobInvoice : Invoice
    {
        public Guid Id { get; set; }
        public ICollection<JobInvoiceItem> Items { get; set; } = new List<JobInvoiceItem>();
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        public string SellerUsername { get; set; }
    }
}