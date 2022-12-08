using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.MembershipAggregate
{
    public class Subscription
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public string Unit { get; set; }
        public double Total { get; set; }
    }
}