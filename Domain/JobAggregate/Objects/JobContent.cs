using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate.Enums;
using Microsoft.EntityFrameworkCore;
using Domain.JobAggregate.Enums;

namespace Domain.JobAggregate.Objects
{
    public class JobContent
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public JobMediaType Type { get; set; }
        public string Caption { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }

    }
}