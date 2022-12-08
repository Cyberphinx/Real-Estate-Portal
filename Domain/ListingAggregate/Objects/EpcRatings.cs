using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class EpcRatings
    {
        public int EerCurrentRating { get; set; }
        public int EerPotentialRating { get; set; }
        public int EirCurrentRating { get; set; }
        public int EirPotentialRating { get; set; }
    }
}