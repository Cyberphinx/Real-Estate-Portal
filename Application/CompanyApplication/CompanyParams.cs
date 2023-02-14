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
    public class CompanyParams : PagingParams
    {
        public DateTime AddedOn { get; set; } = DateTime.UtcNow;
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string ServiceCategory { get; set; }
        public string MinMaxPrice { get; set; }
        public string MinMaxBeds { get; set; }
        public string MapBounds { get; set; }

    }
}