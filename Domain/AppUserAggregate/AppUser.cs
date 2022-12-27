using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppUserAggregate.Enums;
using Domain.AppUserAggregate.Objects;
using Domain.LocationAggregate;
using Microsoft.AspNetCore.Identity;

namespace Domain.AppUserAggregate
{
    public class AppUser : IdentityUser
    {
        public AccountType AccountType { get; set; }
        public DateTime AddedOn { get; set; }
        public string Description { get; set; }
        public string DisplayName { get; set; }
        public Country Country { get; set; }
        public Language Language { get; set; }
        public ICollection<JobNetwork> Jobs { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<AppUserReview> Reviews { get; set; }
        public ICollection<ListingWatcher> SavedListings { get; set; }

    }
}