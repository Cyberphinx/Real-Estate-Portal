using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;
using Domain.OrderAggregate;
using Application.OrderApplication;
using Domain.ListingAggregate;

namespace Application.CompanyApplication
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public DateTime AddedOn { get; set; }
        public ICollection<Availability> Availabilities { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public ICollection<CompanyContent> CompanyContents { get; set; }
        public CompanyDetails CompanyDetails { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string CompanyName { get; set; }
        public string CompanyReference { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
        public ICollection<Listing> Listings { get; set; }
        public string Logo { get; set; }
        public Membership Membership { get; set; }
        public ICollection<Order> Orders  { get; set; }
        public RedressScheme RedressScheme { get; set; } 
        public string ServiceLocations { get; set; }
        public string ServiceScope { get; set; }
        public string SummaryDescription { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
        public List<string> Usernames { get; set; }
    }
}