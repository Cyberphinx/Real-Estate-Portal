using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain.JobAggregate.Enums;
using Application.ProfileApplication.ProfileDtos;
using Application.CompanyApplication.CompanyDtos;

namespace Application.ProfileApplication
{
    public class ListCompanies
    {
        public class Query : IRequest<Result<List<UserCompanyDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserCompanyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserCompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Companies
                    .Where(c => c.Username == request.Username)
                    .OrderByDescending(a => a.AddedOn).ThenBy(a => a.Id)
                    .ProjectTo<UserCompanyDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "public" => query.Where(x => x.AccessStatus == AccessStatus.Public),
                    "private" => query.Where(x => x.AccessStatus == AccessStatus.Private),
                    _ => query
                };

                var companies = await query.ToListAsync();

                return Result<List<UserCompanyDto>>.Success(companies);
            }
        }
    }
}