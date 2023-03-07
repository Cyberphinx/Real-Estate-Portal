using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ListingApplication.ListingDtos
{
    public class ServiceChargeDto
    {
        public Guid Id { get; set; }
        public bool Applicable { get; set; }
        public double Charge { get; set; }
        public UnitOfArea PerUnitAreaUnits { get; set; }
        public Frequency Frequency { get; set; }
        public string ReviewPeriod { get; set; }
    }
}