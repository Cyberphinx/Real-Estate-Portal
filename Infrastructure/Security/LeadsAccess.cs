using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication.JobDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.CompanyAggregate;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class LeadsAccess : IAuthorizationRequirement
    {
    }

    public class LeadsAccessHandler : AuthorizationHandler<LeadsAccess>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public LeadsAccessHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, LeadsAccess requirement)
        {
            // get username from context
            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username == null) return Task.CompletedTask;

            // get job id from context
            var jobId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "jobId").Value.ToString());

            // find the selected job
            var job = _dbContext.Jobs
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == jobId).Result;

            if (job == null) return Task.CompletedTask;

            // check if the current username is equal to one of the selected job's Paid Shorlisted Company's username
            if (job.Networks.FirstOrDefault(x => x.Username == username).Role == JobNetworkRole.PaidCompany
            || job.Networks.FirstOrDefault(x => x.Username == username).Role == JobNetworkRole.Customer)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }

    }
}