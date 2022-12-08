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

namespace Application.CompanyApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<CompanyDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CompanyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var companies = await _context.Companies
                    .OrderByDescending(x => x.AddedOn)
                    .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<CompanyDto>>.Success(companies);
            }
        }
    }
}