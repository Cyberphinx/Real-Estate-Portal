using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class LeaseExpiry
    {
        public string ExpiryDate { get; set; }
        public int YearsRemaining { get; set; }
    }
}