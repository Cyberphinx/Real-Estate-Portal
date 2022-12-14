using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.LocationAggregate;

namespace Application.ListingApplication
{
    public class Owner
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public ICollection<CompanyContent> CompanyContents { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string LegalName { get; set; }
        public string CompanyReference { get; set; }
        public string DisplayName { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
        public RedressScheme RedressScheme { get; set; } 
        public string ServiceLocations { get; set; }
        public string SummaryDescription { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }

    }
}