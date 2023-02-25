using System;
using System.Collections.Generic;
using Domain;
using Domain.CompanyAggregate.Enums;
using Domain.Enums;

namespace Application.CompanyApplication.CompanyDtos
{
    public class UserCompanyDto
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public DateTime AddedOn { get; set; }
        public CompanyAddressDto CompanyAddress { get; set; }
        public CompanyContactsDto CompanyContacts { get; set; }
        public ICollection<CompanyMediaDto> CompanyMedia { get; set; }
        public ICollection<CompanyDescriptionDto> CompanyDescriptions { get; set; }
        public string CompanyReference { get; set; }
        public string CompanyRegistrationNumber { get; set; }
        public string CompanyType { get; set; }
        public string DisplayName { get; set; }
        public string IcoRegistrationNumber { get; set; }
        public ICollection<InsuranceDto> Insurances { get; set; }
        public bool IsMain { get; set; }
        public DateTime LastModified { get; set; }
        public string LegalName { get; set; }
        public int ListingsCount { get; set; }
        public string RedressScheme { get; set; } 
        public ICollection<CompanyReviewDto> Reviews { get; set; }
        public string ServiceLocations { get; set; }
        public string SummaryDescription { get; set; }
        public List<string> ServiceCategories { get; set; }
        public string TermsAndConditions { get; set; }
        public string Username { get; set; }
        public string VatNumber { get; set; }
    
    }
}