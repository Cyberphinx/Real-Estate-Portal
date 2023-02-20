using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication.JobDtos;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.AppUserAggregate;
using Domain.CompanyAggregate;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsOwner : IAuthorizationRequirement
    {
    }

    public class IsOwnerHandler : AuthorizationHandler<IsOwner>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public IsOwnerHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwner requirement)
        {
            // get username from authorization context
            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username == null) return Task.CompletedTask;

            // get username from query string within context
            var httpUsername = _httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "username").Value.ToString();

            if (httpUsername == null) return Task.CompletedTask;

            // check if the current username is equal to the selected job's customer's username
            if (username == httpUsername) context.Succeed(requirement);

            return Task.CompletedTask;
        }

    }
}