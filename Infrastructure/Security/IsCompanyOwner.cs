using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.CompanyApplication.CompanyDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.CompanyAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsCompanyOwner : IAuthorizationRequirement
    {
    }

    public class IsCompanyOwnerHandler : AuthorizationHandler<IsCompanyOwner>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public IsCompanyOwnerHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCompanyOwner requirement)
        {
            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username == null) return Task.CompletedTask;

            var companyId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

            var company = _dbContext.Companies
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == companyId).Result;

            if (company == null) return Task.CompletedTask;

            if (company.Username == username) context.Succeed(requirement);

            return Task.CompletedTask;
        }

    }
}