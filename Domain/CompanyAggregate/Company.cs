using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.ListingAggregate;
using Domain.MediaAggregate;
using Domain.CompanyAggregate.Objects;
using Domain.CompanyAggregate.Enums;

namespace Domain.CompanyAggregate
{
    public class Company
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public ICollection<CompanyMedia> CompanyMedia { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string CompanyReference { get; set; }
        public string CompanyRegistrationNumber { get; set; }
        public string CompanyType { get; set; } // ie. Sole Trader, Limited Company, Partnership, LLP, Public Company, etc.
        public string DisplayName { get; set; }
        public string IcoRegistrationNumber { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
        public bool IsMain { get; set; }
        public DateTime LastModified { get; set; }
        public string LegalName { get; set; }
        public ICollection<Listing> Listings { get; set; }
        public string RedressScheme { get; set; } 
        public ICollection<CompanyReview> Reviews { get; set; }
        public string ServiceLocations { get; set; }
        public string SummaryDescription { get; set; }
        public List<string> ServiceCategories { get; set; }
        public string TermsAndConditions { get; set; } // ie. the download url of the T&C pdf
        public string Username { get; set; }
        public string VatNumber { get; set; }

    }
}