using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.AppUserAggregate.Enums;
using Domain.CompanyAggregate.Enums;
using Domain.LocationAggregate;
using Domain.CompanyAggregate.Objects;
using Domain.ListingAggregate.Enums;

namespace Application.AccountApplication.AccountDtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", ErrorMessage = "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public AccountType AccountType { get; set; }
        public DateTime AddedOn { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
        
        [MaxLength(20, ErrorMessage = "Max length is 20")]
        public string DisplayName { get; set; }

        // for company sign up
        public AccessStatus CompanyAccessStatus { get; set; }
        public string CompanyLegalName { get; set; }
        public bool IsMainCompany { get; set; }
        public CompanyAddress LegalCompanyAddress { get; set; }
        public string CompanyNumber { get; set; }
        public string IcoNumber { get; set; }
        public string RedressScheme { get; set; }

        // for property agent signup fee
        public string InvoiceDescription { get; set; }

        // the amount needs to be in the smallest currency unit, ie. Cents
        public long InvoiceAmount { get; set; }

        // ISO 3-Letter Currency Code in lowercase
        public string InvoiceCurrency { get; set; }
    }
}