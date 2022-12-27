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

namespace Application.CompanyApplication
{
    public class ListListings
    {
        public class Query : IRequest<Result<List<Stock>>> 
        {
            public Guid CompanyId { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Stock>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<Stock>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Listings
                    .Where(c => c.Company.Id == request.CompanyId)
                    .OrderByDescending(x => x.AddedOn).ThenBy(x => x.Id)
                    .ProjectTo<Stock>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "public" => query.Where(x => x.AccessStatus == AccessStatus.Public),
                    "private" => query.Where(x => x.AccessStatus == AccessStatus.Private),
                    "rent" => query.Where( c => c.Pricing.TransactionType == TransactionType.Rent),
                    "sale" => query.Where( c => c.Pricing.TransactionType == TransactionType.Sale),
                    _ => query.Where( c => c.Pricing.TransactionType == TransactionType.Rent)
                };

                var listings = await query.ToListAsync();

                return Result<List<Stock>>.Success(listings);
            }
        }
    }
}