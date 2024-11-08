using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Enums;

namespace Application.JobApplication.JobDtos
{
    public class NetworkPublicDto
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int JobsCount { get; set; }
        public int ReviewsCount { get; set; }
        public JobNetworkRole Role { get; set; }
    }
}