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
    public class ListAll
    {
        public class Query : IRequest<Result<List<JobPublicDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobPublicDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<JobPublicDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs
                    .OrderByDescending(x => x.AddedOn)
                    .ProjectTo<JobPublicDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .ToListAsync();

                return Result<List<JobPublicDto>>.Success(jobs);
            }
        }
    }
}