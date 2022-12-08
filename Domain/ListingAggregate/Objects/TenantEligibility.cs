using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class TenantEligibility
    {
        public Eligibility Dss { get; set; }
        public Eligibility Students { get; set; }
    }
}