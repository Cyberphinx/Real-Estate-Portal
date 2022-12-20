using System;
using System.Collections.Generic;
using Domain;
using Domain.Enums;

namespace Application.CompanyApplication.CompanyDtos
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddressDto CompanyAddress { get; set; }
        public CompanyContactsDto CompanyContacts { get; set; }
        public ICollection<CompanyContentDto> CompanyContents { get; set; }
        public ICollection<CompanyDescriptionDto> CompanyDescriptions { get; set; }
        public string CompanyReference { get; set; }
        public string CompanyRegistrationNumber { get; set; }
        public string DisplayName { get; set; }
        public ICollection<InvoiceDto> Invoices { get; set; }
        public ICollection<InsuranceDto> Insurances { get; set; }
        public DateTime LastModified { get; set; }
        public string LegalName { get; set; }
        public ICollection<Stock> Listings { get; set; }
        public MembershipDto Membership { get; set; }
        public List<RedressScheme> RedressSchemes { get; set; } 
        public ICollection<CompanyReviewDto> Reviews { get; set; }
        public string ServiceLocations { get; set; }
        public string SummaryDescription { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public string Username { get; set; }
    }
}