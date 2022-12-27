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
using Domain.JobAggregate.Enums;
using Application.ProfileApplication.ProfileDtos;

namespace Application.ProfileApplication
{
    public class ListJobs
    {
        public class Query : IRequest<Result<List<UserJobDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserJobDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserJobDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.JobNetworks
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderByDescending(a => a.Job.AddedOn).ThenBy(a => a.JobId)
                    .ProjectTo<UserJobDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "open" => query.Where(x => x.JobLifeCycle == JobLifeCycle.Open),
                    "cancelled" => query.Where(x => x.JobLifeCycle == JobLifeCycle.Cancelled),
                    "completed" => query.Where(x => x.JobLifeCycle == JobLifeCycle.Completed),
                    _ => query
                };

                var jobs = await query.ToListAsync();

                return Result<List<UserJobDto>>.Success(jobs);
            }
        }
    }
}