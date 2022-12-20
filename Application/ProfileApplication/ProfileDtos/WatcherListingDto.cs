using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ProfileApplication.ProfileDtos
{
    public class WatcherListingDto
    {
        public string ListingReference { get; set; }
        public string ListingImage { get; set; }
        public string ListingPrice { get; set; }
        public string ListingCity { get; set; }
        public string ListingPostcode { get; set; }
    }
}