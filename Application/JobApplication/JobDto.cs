using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;
using Domain.JobAggregate;
using Domain.JobAggregate.Enums;

namespace Application.JobApplication
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime FinishBy { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
        public ICollection<JobContent> JobContents { get; set; }
        public JobLocation JobLocation { get; set; }
        public ICollection<NetworkDto> Networks { get; set; }
    }
}