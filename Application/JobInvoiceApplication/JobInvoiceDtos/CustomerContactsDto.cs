using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobApplication.JobDtos;

namespace Application.JobInvoiceApplication.JobInvoiceDtos
{
    public class CustomerContactsDto
    {
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public ICollection<JobLocationDto> CustomerAddresses { get; set; }
    }
}