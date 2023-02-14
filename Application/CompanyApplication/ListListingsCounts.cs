using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;
using Application.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Application.CompanyApplication
{
    public class ListListingsCounts
    {
        public class Query : IRequest<Result<int>> 
        {
            public Guid companyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var counts = await _context.Listings
                    .Where(x => x.CompanyId == request.companyId)
                    .CountAsync();

                return Result<int>.Success(counts);
            }
        }
    }
}