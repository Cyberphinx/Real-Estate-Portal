using System;
using System.Collections.Generic;
using Domain;
using Domain.Enums;

namespace Application.CompanyApplication.CompanyDtos
{
    public class UserCompanyDto
    {
        public Guid Id { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public string CompanyReference { get; set; }
        public string DisplayName { get; set; }
        public bool IsMain { get; set; }
        public string LegalName { get; set; }
        public int ListingsCount { get; set; }
        public string SummaryDescription { get; set; }
        public string Username { get; set; }
        public CompanyAddressDto CompanyAddress { get; set; }
    }
}