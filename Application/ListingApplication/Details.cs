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
    public class Details
    {
        public class Query : IRequest<Result<ListingDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ListingDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ListingDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var advert =  await _context.Listings
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ListingDto>.Success(advert);
            }
        }
    }
}