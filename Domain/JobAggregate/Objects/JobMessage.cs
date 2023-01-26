using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate;

namespace Domain.JobAggregate.Objects
{
    public class JobMessage
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public Job Job { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}