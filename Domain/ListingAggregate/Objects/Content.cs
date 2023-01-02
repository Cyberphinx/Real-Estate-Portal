using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Domain.ListingAggregate.Objects
{
    public class Content
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public MediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}