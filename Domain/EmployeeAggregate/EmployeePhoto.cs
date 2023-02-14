using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Domain.EmployeeAggregate
{
    public class EmployeePhoto : Media
    {
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}