using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TrackingAggregate
{
    public class Tracking
    {
        public Guid Id { get; set; }
        public string App { get; set; }
        public string Component { get; set; }
        public string Event { get; set; }
        public string Count { get; set; }
        public string JobId { get; set; }
        public string CompanyId { get; set; }
        public string ListingId { get; set; }
    }
}