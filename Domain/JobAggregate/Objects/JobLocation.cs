using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain.JobAggregate.Objects
{
    public class JobLocation : Location
    {
        public Guid Id { get; set; }
        public string AddressType { get; set; } // i.e. JobLocation, NewLocation, or CorrespondenceAddress
        public int Index { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
    }
}