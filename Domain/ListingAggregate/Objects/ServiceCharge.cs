using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class ServiceCharge
    {
        public Guid Id { get; set; }
        public bool Applicable { get; set; }
        public double Charge { get; set; }
        public UnitOfArea PerUnitAreaUnits { get; set; }
        public Frequency Frequency { get; set; }
        public string ReviewPeriod { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}