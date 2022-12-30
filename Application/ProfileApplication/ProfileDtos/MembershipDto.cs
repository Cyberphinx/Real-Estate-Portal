using System;
using Domain.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class MembershipDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Expiry { get; set; }
        public bool IsActive { get; set; }
        public DateTime MemberSince { get; set; }
    }
}