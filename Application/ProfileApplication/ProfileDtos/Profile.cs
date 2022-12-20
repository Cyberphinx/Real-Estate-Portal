using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate.Objects;

namespace Application.ProfileApplication.ProfileDtos
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<AppUserReviewDto> Reviews { get; set; }
        public ICollection<UserJobDto> Jobs { get; set; }
        public ICollection<WatcherListingDto> SavedListings { get; set; }
    }
}