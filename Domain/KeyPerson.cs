using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using Domain.EmployeeAggregate;
using Domain.ListingAggregate;

namespace Domain
{
    // junction table of many to many relationships
    public class KeyPerson
    {
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}