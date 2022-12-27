using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ListingApplication.ListingDtos;
using Domain.Enums;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;
using Domain.LocationAggregate;

namespace Application.CompanyApplication
{
    public class Stock
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public int AvailableBedrooms { get; set; }
        public DateTime AvailableFromDate { get; set; }
        public int Bathrooms { get; set; }
        public string Image { get; set; }
        public LifeCycleStatus LifeCycleStatus { get; set; }
        public string ListingReference { get; set; }
        public ListingLocationDto ListingLocation { get; set; }
        public bool NewBuild { get; set; }
        public PricingDto Pricing { get; set; }
        public PropertyType PropertyType { get; set; }
        public int TotalBedrooms { get; set; }
    }
}