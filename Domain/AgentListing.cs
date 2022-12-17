using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;

namespace Domain
{
    public class AgentListing
    {
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public string ListingId { get; set; }
        public Listing Listing { get; set; }
        public string CompanyReference { get; set; }
    }
}