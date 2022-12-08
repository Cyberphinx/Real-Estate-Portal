using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.OrderAggregate
{
    public class AcceptanceForm
    {
        public Guid Id { get; set; }
        public long GoodsValue { get; set; }
        public bool StorageRequired { get; set; }
        public long GoodsValueToBeStored { get; set; }
        public string TermsAndConditions { get; set; }
        public DateTime LastModified { get; set; }
        public bool Accepted { get; set; }
        public DateTime AcceptanceTime { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}