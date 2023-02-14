using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.CompanyApplication.CompanyDtos;
using Application.Core;
using Application.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CompanyApplication
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CompanyDto>>>
        {
            public CompanyParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CompanyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<CompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // paging, sorting, searching, filtering function
                // nothing is taking place in the database in below method, we are just building up an expression tree using IQueryable<T>
                var query = _context.Companies
                    .Where(a => a.AccessStatus == AccessStatus.Public)
                    .SearchCompanies(request.Params.SearchTerm)
                    .FilterCompanies(request.Params.ServiceCategory)
                    .SearchCompaniesOnMap(request.Params.MapBounds)
                    .SortCompanies(request.Params.OrderBy)
                    .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsSplitQuery()
                    .AsQueryable();

                return Result<PagedList<CompanyDto>>.Success(
                   await PagedList<CompanyDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
               );
            }
        }
    }
}