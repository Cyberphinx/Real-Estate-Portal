using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.InvoiceAggregate;

namespace Application.JobApplication
{
    public class NetworkDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public InvoiceDto Invoice { get; set; }
        public int JobsCount { get; set; }
        public int ReviewsCount { get; set; }
    }
}