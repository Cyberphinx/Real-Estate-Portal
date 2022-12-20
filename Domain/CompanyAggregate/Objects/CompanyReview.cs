using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.CompanyAggregate.Objects
{
    public class CompanyReview : Review
    {
        public int Id { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}