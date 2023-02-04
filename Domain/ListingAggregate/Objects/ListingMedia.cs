using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Domain.ListingAggregate.Objects
{
    public class ListingMedia : Media
    {
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}