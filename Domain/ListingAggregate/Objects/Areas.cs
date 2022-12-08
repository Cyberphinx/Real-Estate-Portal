using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class Areas
    {
        public Guid Id { get; set; }
        public Area External { get; set; }
        public Area Internal { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}