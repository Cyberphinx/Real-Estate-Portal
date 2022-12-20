using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.JobAggregate.Enums;

namespace Application.ProfileApplication.ProfileDtos
{
    public class UserJobDto
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public string Title { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public JobNetworkRole Role { get; set; }
    }
}