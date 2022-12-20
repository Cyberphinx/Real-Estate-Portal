using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.CompanyAggregate;
using Domain.JobAggregate.Objects;
using Domain.JobAggregate.Enums;

namespace Application.JobApplication.JobDtos
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
        public ICollection<JobContentDto> JobContents { get; set; }
        public JobLocationDto JobLocation { get; set; }
        public ICollection<NetworkDto> Networks { get; set; }
    }
}