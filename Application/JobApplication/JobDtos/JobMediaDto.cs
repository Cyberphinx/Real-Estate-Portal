using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Application.JobApplication.JobDtos
{
    public class JobMediaDto
    {
        public string Id { get; set; }
        public int Index { get; set; }
        public string Url { get; set; }
        public MediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
    }
}