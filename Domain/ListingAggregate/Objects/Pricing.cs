using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class Pricing
    {
        public TransactionType TransactionType { get; set; }
        public Currency Currency { get; set; }
        public double Price { get; set; }
        public PricePerUnitArea PricePerUnitArea { get; set; }
        public Frequency RentFrequency { get; set; }
        public PriceQualifier PriceQualifier { get; set; }
        public bool Auction { get; set; }
    }
}