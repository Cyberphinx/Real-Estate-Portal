using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;

namespace Application.CompanyApplication
{
    public class AgentListingParams : PagingParams
    {
        public DateTime AddedOn { get; set; } = DateTime.UtcNow;
        public Guid CompanyId { get; set; } // this is the Id of the company entity (Role = Agent)
        public string Channel { get; set; }
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string PropertyTypes { get; set; }
        public string MinMaxPrice { get; set; }
        public string MinMaxBeds { get; set; }
        public string MapBounds { get; set; }

    }
}