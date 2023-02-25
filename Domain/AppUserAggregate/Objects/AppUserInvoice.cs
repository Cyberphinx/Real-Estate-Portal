using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.InvoiceAggregate;

namespace Domain.AppUserAggregate.Objects
{
    public class AppUserInvoice : Invoice
    {
        public Guid Id { get; set; }
        public ICollection<AppUserInvoiceItem> Items { get; set; } = new List<AppUserInvoiceItem>();
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

    }
}