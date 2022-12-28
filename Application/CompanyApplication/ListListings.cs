using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.ListingApplication;
using Domain.ListingAggregate.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Extensions;

namespace Application.CompanyApplication
{
    public class ListListings
    {
        public class Query : IRequest<Result<PagedList<Stock>>> 
        {
            public AgentListingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Stock>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<Stock>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Listings
                    .WhereAgentListing(request.Params.AgentId)
                    .SearchAgentListing(request.Params.SearchTerm)
                    .FilterAgentListing(request.Params.Channel, request.Params.PropertyTypes, request.Params.MinMaxPrice, request.Params.MinMaxBeds)
                    .SearchMapAgentListing(request.Params.MapBounds)
                    .SortAgentListing(request.Params.OrderBy)
                    .ProjectTo<Stock>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var listings = await PagedList<Stock>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return Result<PagedList<Stock>>.Success(listings);
            }
        }
    }
}