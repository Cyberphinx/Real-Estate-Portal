using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public double VatPercentage { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
    }
}