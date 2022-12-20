using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.LocationAggregate;
using Domain;
using Application.CompanyApplication.CompanyDtos;

namespace Application.ListingApplication.ListingDtos
{
    public class Owner
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddressDto CompanyAddress { get; set; }
        public CompanyContactsDto CompanyContacts { get; set; }
        public string LegalName { get; set; }
        public string CompanyReference { get; set; }
        public string DisplayName { get; set; }
        public List<RedressScheme> RedressSchemes { get; set; } 
        public string SummaryDescription { get; set; }

    }
}