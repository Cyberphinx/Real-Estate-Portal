using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.JobApplication.JobDtos
{
    public class JobMessageDto
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}