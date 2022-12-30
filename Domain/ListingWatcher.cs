using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate;
using Domain.ListingAggregate;

namespace Domain
{
    public class ListingWatcher
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
        public DateTime AddedOn { get; set; }
    }
}