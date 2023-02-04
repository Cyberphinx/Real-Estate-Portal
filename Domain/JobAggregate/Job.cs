using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;
using Domain.Enums;
using Domain.JobAggregate.Enums;
using Domain.JobAggregate.Objects;

namespace Domain.JobAggregate
{
    public class Job
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime FinishBy { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
        public ICollection<JobMedia> JobMedia { get; set; }
        public JobLocation JobLocation { get; set; }
        public ICollection<JobNetwork> Networks { get; set; } = new List<JobNetwork>();
        public ICollection<JobMessage> Messages { get; set; } = new List<JobMessage>();
    }
}