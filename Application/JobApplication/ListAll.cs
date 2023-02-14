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
        public class Query : IRequest<Result<List<JobDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs
                    .OrderByDescending(x => x.AddedOn)
                    .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .ToListAsync();

                return Result<List<JobDto>>.Success(jobs);
            }
        }
    }
}