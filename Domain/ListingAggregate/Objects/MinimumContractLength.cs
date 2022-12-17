using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class MinimumContractLength
    {
        public int MinimumLength { get; set; }
        public UnitOfTime Units { get; set; }
    }
}