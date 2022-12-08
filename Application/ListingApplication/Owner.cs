using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.LocationAggregate;
using Domain.OrderAggregate;

namespace Application.ListingApplication
{
    public class Owner
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public ICollection<Availability> Availabilities { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public ICollection<CompanyContent> CompanyContents { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string CompanyName { get; set; }
        public string CompanyReference { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
        public string Logo { get; set; }
        public RedressScheme RedressScheme { get; set; } 
        public string ServiceLocations { get; set; }
        public string ServiceScope { get; set; }
        public string SummaryDescription { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
    }
}