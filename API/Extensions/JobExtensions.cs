using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using Domain.Enums;
using Domain.JobAggregate;

namespace API.Extensions
{
    public static class JobExtensions
    {
        public static CustomerContactsDto MapJobToCustomerContactsDto(this Job job)
        {
            return new CustomerContactsDto
            {
                CustomerName =
                    String.IsNullOrEmpty(job.CustomerName)
                    ? job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer).AppUser.DisplayName
                    : job.CustomerName,
                CustomerEmail = 
                    String.IsNullOrEmpty(job.CustomerEmail)
                    ? job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer).AppUser.Email
                    : job.CustomerEmail,
                CustomerPhone = 
                    String.IsNullOrEmpty(job.CustomerPhone)
                    ? job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer).AppUser.PhoneNumber
                    : job.CustomerPhone
            };
        }
    }
}