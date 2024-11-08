using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.JobAggregate;
using Domain.AppUserAggregate;
using Domain.Enums;

namespace Domain
{
    // junction table of many to many relationships
    public class JobNetwork
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        public JobNetworkRole Role { get; set; }
    }
}