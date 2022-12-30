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

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public AccountType AccountType { get; set; }
        public DateTime AddedOn { get; set; }
        public Country Country { get; set; }
        public Language Language { get; set; }

        // for company sign up
        public AccessStatus CompanyAccessStatus { get; set; }
        public string CompanyLegalName { get; set; }

        [MaxLength(25, ErrorMessage = "Max length is 25")]
        public string CompanyDisplayName { get; set; }
        public bool IsMainCompany { get; set; }
        public string ComapnyIcoNumber { get; set; }
        public List<RedressScheme> CompanyRedressSchemes { get; set; }
        public ICollection<Insurance> CompanyInsurances { get; set; }
        public CompanyAddress LegalCompanyAddress { get; set; }

        // for property agent signup fee
        public string InvoiceDescription { get; set; }
        public long InvoiceAmount { get; set; }
    }
}