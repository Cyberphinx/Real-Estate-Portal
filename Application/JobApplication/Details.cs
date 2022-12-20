using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.JobApplication.JobDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobApplication
{
    public class Details
    {
        public class Query : IRequest<Result<JobDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<JobDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order =  await _context.Jobs
                    .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<JobDto>.Success(order);
            }
        }
    }
}