using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.CompanyAggregate
{
    public class Availability
    {
        public Guid Id { get; set; }
        public bool Available { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

    }
}