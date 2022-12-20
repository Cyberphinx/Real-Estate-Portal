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
using Application.ListingApplication.ListingDtos;

namespace Application.ListingApplication
{
    public class ListAll
    {
        public class Query : IRequest<Result<List<ListingDto>>>{ }

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
                var listings = await _context.Listings
                    .OrderByDescending(x => x.AddedOn)
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<ListingDto>>.Success(listings);
            }
        }
    }
}