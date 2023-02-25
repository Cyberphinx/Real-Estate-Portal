using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsJobInvoiceCustomer : IAuthorizationRequirement
    {
    }

    public class IsJobInvoiceCustomerHandler : AuthorizationHandler<IsJobInvoiceCustomer>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public IsJobInvoiceCustomerHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsJobInvoiceCustomer requirement)
        {
            // get username from context
            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username == null) return Task.CompletedTask;

            // get company id from context
            var invoiceId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "invoiceId").Value.ToString());

            // find the selected company
            var invoice = _dbContext.JobInvoices
                .ProjectTo<JobInvoiceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == invoiceId)
                .Result;

            if (invoice == null) return Task.CompletedTask;

            var job = _dbContext.Jobs
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == invoice.JobId)
                .Result;
            
            var customer = job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer);

            // check if the current username is equal to the selected invoice's customer username
            if (customer.Username == username) context.Succeed(requirement);

            return Task.CompletedTask;
        }

    }
}