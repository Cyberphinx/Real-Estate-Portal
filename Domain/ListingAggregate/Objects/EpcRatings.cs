using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class EpcRatings
    {
        public Guid Id { get; set; }
        public int EerCurrentRating { get; set; }
        public int EerPotentialRating { get; set; }
        public int EirCurrentRating { get; set; }
        public int EirPotentialRating { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}