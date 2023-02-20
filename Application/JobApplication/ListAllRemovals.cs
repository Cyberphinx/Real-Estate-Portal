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
    public class ListAllRemovals
    {
        public class Query : IRequest<Result<List<JobCalendar>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobCalendar>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<JobCalendar>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs
                    .Where(x => x.ServiceCategories.Contains("Removals"))
                    .OrderByDescending(x => x.FinishBy).ThenBy(x => x.Id)
                    .ProjectTo<JobCalendar>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .ToListAsync();

                return Result<List<JobCalendar>>.Success(jobs);
            }
        }
    }
}