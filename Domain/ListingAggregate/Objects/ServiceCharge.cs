using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class ServiceCharge
    {
        public double Charge { get; set; }
        public UnitOfArea PerUnitAreaUnits { get; set; }
        public Frequency Frequency { get; set; }
    }
}