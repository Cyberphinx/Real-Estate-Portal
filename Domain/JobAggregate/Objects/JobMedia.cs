using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Domain.JobAggregate.Objects
{
    public class JobMedia : Media
    {
        public Guid JobId { get; set; }
        public Job Job { get; set; }
    }
}