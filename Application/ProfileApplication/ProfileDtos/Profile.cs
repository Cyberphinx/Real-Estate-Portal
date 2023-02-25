using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Domain.AppUserAggregate.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class Profile
    {
        public DateTime AddedOn { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
        public string Image { get; set; }
        public MembershipDto Membership { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<AppUserReviewDto> Reviews { get; set; }
        public ICollection<UserInvoiceDto> Invoices { get; set; }
    }
}