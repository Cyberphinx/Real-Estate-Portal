using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ListingApplication.ListingDtos
{
    public class PricingDto
    {
        public Guid Id { get; set; }
        public TransactionType TransactionType { get; set; }
        public Currency Currency { get; set; }
        public double Price { get; set; }
        public double PricePerUnitArea { get; set; }
        public Frequency RentFrequency { get; set; }
        public PriceQualifier PriceQualifier { get; set; }
        public bool Auction { get; set; }
        public UnitOfArea AreaUnits { get; set; }
    }
}