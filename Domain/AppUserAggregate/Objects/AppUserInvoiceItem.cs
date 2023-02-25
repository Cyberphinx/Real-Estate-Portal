using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.InvoiceAggregate;

namespace Domain.AppUserAggregate.Objects
{
    public class AppUserInvoiceItem : InvoiceItem
    {
        public Guid Id { get; set; }
        public Guid AppUserInvoiceId { get; set; }
        public AppUserInvoice AppUserInvoice { get; set; }
    }
}