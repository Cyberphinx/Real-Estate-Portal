using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain.JobAggregate.Enums;
using Application.ProfileApplication.ProfileDtos;
using Domain.ListingAggregate.Enums;

namespace Application.ProfileApplication
{
    public class ListSavedListings
    {
        public class Query : IRequest<Result<List<WatcherListingDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<WatcherListingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<WatcherListingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ListingWatchers
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(x => x.Listing.AddedOn).ThenBy(x => x.Listing.Id)
                    .ProjectTo<WatcherListingDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "price" => query.OrderBy(p => p.Price).ThenBy(p => p.Id),
                    "priceDesc" => query.OrderByDescending(p => p.Price).ThenBy(p => p.Id),
                    "rent" => query.Where(x => x.TransactionType == TransactionType.Rent),
                    "sale" => query.Where(x => x.TransactionType == TransactionType.Sale),
                    _ => query.OrderByDescending(p => p.AddedOn).ThenBy(p => p.Id)
                };

                var savedListings = await query.ToListAsync();

                return Result<List<WatcherListingDto>>.Success(savedListings);
            }
        }
    }
}