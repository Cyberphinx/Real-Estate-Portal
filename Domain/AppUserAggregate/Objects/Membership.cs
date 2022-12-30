using System;
using Domain.Enums;
using Domain.AppUserAggregate.Enums;

namespace Domain.AppUserAggregate.Objects
{
    public class Membership
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Expiry { get; set; }
        public bool IsActive { get; set; }
        public DateTime MemberSince { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}