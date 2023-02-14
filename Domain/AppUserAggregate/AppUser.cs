using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate.Enums;
using Domain.AppUserAggregate.Objects;
using Microsoft.AspNetCore.Identity;
using Domain.InvoiceAggregate;

namespace Domain.AppUserAggregate
{
    public class AppUser : IdentityUser
    {
        public AccountType AccountType { get; set; }
        public DateTime AddedOn { get; set; }
        public string Description { get; set; }
        public string DisplayName { get; set; }
        public string Country { get; set; }
        public Language Language { get; set; }
        public Membership Membership { get; set; }
        
        // public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
        public ICollection<JobNetwork> Jobs { get; set; }
        public ICollection<AppUserMedia> Photos { get; set; }
        public ICollection<AppUserReview> Reviews { get; set; }
        public ICollection<ListingWatcher> SavedListings { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}