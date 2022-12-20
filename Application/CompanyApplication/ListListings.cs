using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.ListingApplication;
using Application.ListingApplication.ListingDtos;
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
        public class Query : IRequest<Result<List<ListingDto>>> 
        {
            public string CompanyRef { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ListingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ListingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Listings
                    .Where(c => c.Company.CompanyReference == request.CompanyRef)
                    .OrderBy(x => x.AddedOn)
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "public" => query.Where(x => x.AccessStatus == AccessStatus.Public),
                    "private" => query.Where(x => x.AccessStatus == AccessStatus.Private),
                    _ => query
                };

                var listings = await query.ToListAsync();

                return Result<List<ListingDto>>.Success(listings);
            }
        }
    }
}