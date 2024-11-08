using System;

namespace Domain.ListingAggregate.Objects
{
    public class KeyContact
    {
        public Guid Id { get; set; }
        public string Agency { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}