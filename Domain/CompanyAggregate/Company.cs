using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.InvoiceAggregate;
using Domain.ListingAggregate;
using Domain.CompanyAggregate.Objects;

namespace Domain.CompanyAggregate
{
    public class Company
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public ICollection<CompanyContent> CompanyContents { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string CompanyReference { get; set; }
        public string CompanyRegistrationNumber { get; set; }
        public string DisplayName { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
        public DateTime LastModified { get; set; }
        public string LegalName { get; set; }
        public ICollection<Listing> Listings { get; set; }
        public Membership Membership { get; set; }
        public List<RedressScheme> RedressSchemes { get; set; } 
        public ICollection<CompanyReview> Reviews { get; set; }
        public string ServiceLocations { get; set; }
        public string SummaryDescription { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public string Username { get; set; }
    }
}