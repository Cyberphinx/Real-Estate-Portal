using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;

namespace Application.ListingApplication.ListingDtos
{
    public class ListingLocationDto : Location
    {
        public Guid Id { get; set; }
    }
}