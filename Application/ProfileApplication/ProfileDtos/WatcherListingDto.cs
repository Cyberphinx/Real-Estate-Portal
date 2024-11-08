using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class WatcherListingDto
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public string Reference { get; set; }
        public TransactionType TransactionType { get; set; }
        public string Image { get; set; }
        public LifeCycleStatus LifeCycleStatus { get; set; }
        public double Price { get; set; }
        public string PriceQualifier { get; set; }
        public string Currency { get; set; }
        public Frequency RentFrequency { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
    }
}