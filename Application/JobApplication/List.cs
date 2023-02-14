using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using Application.JobApplication.JobDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobApplication
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<JobDto>>> 
        {
            public JobParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // paging, sorting, searching, filtering function
                // nothing is taking place in the database in below method, we are just building up an expression tree using IQueryable<T>
                var query = _context.Jobs
                    .SearchJobTitles(request.Params.SearchTerm)
                    .FilterJobs(request.Params.ServiceCategory)
                    .SearchJobsOnMap(request.Params.MapBounds)
                    .SortJobs(request.Params.OrderBy)
                    .ProjectTo<JobDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsSplitQuery()
                    .AsQueryable();

                return Result<PagedList<JobDto>>.Success(
                   await PagedList<JobDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
               );
            }
        }
    }
}