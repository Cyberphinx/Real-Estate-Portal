using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.JobAggregate.Enums;

namespace Application.JobApplication.JobDtos
{
    public class JobContentDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public JobMediaType Type { get; set; }
        public string Caption { get; set; }
    }
}