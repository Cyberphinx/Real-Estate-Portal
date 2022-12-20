using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class ListingLocation : Location
    {
        public int Id { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}