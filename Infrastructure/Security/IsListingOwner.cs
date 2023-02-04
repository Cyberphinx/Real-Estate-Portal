using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.CompanyApplication.CompanyDtos;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.CompanyAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsListingOwner : IAuthorizationRequirement
    {
    }

    public class IsListingOwnerHandler : AuthorizationHandler<IsListingOwner>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public IsListingOwnerHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsListingOwner requirement)
        {
            // get username from context
            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username == null) return Task.CompletedTask;

            // get listing id from context
            var listingId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "listingId").Value.ToString());

            // find the selected listing
            var listing = _dbContext.Listings
                .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == listingId).Result;

            if (listing == null) return Task.CompletedTask;

            // check if the current username is equal to the selected company's username
            if (listing.Company.Username == username) context.Succeed(requirement);

            return Task.CompletedTask;
        }

    }
}