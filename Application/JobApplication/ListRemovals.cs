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
    public class ListRemovals
    {
        public class Query : IRequest<Result<PagedList<JobRemovalsDto>>> 
        {
            public JobParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobRemovalsDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<JobRemovalsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Console.WriteLine($"The request datetime in UTC time: {request.Params.FinishBy}");
                Console.WriteLine($"The request datetime in LOCAL time: {request.Params.FinishBy.ToLocalTime()}");
                // paging, sorting, searching, filtering function
                // nothing is taking place in the database in below method, we are just building up an expression tree using IQueryable<T>
                var query = _context.Jobs
                    .Where(x => x.ServiceCategories.Contains("Removals")) // Only get Removals jobs
                    .SearchJobTitles(request.Params.SearchTerm)
                    .FilterJobs(request.Params.ServiceCategory, request.Params.FinishBy)
                    .SearchJobsOnMap(request.Params.MapBounds)
                    .SortJobs(request.Params.OrderBy)
                    .ProjectTo<JobRemovalsDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsSplitQuery()
                    .AsQueryable();

                return Result<PagedList<JobRemovalsDto>>.Success(
                   await PagedList<JobRemovalsDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
               );
            }
        }
    }
}