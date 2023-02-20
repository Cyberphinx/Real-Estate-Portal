using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;

namespace Application.JobApplication.JobDtos
{
    public class JobLocationPublicDto
    {
        public Guid Id { get; set; }
        public string AddressType { get; set; }
        public string TownOrCity { get; set; }
        public string Country { get; set; }
        public int Index { get; set; }
    }
}