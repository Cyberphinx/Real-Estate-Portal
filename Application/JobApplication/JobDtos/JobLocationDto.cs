using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;

namespace Application.JobApplication.JobDtos
{
    public class JobLocationDto : Location
    {
        public int Id { get; set; }
    }
}