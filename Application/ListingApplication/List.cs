using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using Domain.ListingAggregate.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ListingDto>>>
        {
            public ListingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ListingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ListingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // paging, sorting, searching, filtering function
                // nothing is taking place in the database in below method, we are just building up an expression tree using IQueryable<T>
                var query = _context.Listings
                    .Where(a => a.AccessStatus == AccessStatus.Public)
                    .Search(request.Params.SearchTerm)
                    .Filter(request.Params.Channel, request.Params.PropertyTypes, request.Params.MinMaxPrice, request.Params.MinMaxBeds)
                    .SearchMap(request.Params.MapBounds)
                    .Sort(request.Params.OrderBy)
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsNoTracking()
                    .AsSplitQuery()
                    .AsQueryable();

                return Result<PagedList<ListingDto>>.Success(
                    await PagedList<ListingDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}