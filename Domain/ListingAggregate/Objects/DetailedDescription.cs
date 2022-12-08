using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class DetailedDescription
    {
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Heading { get; set; }
        public Dimensions Dimensions { get; set; }
        public string Text { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}