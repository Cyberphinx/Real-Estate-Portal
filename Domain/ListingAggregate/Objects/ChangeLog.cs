using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.ListingAggregate.Objects
{
    public class ChangeLog
    {
        public Guid Id { get; set; }
        public DateTime LastModified { get; set; }
        public string Description { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}