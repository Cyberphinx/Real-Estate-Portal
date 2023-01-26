using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MessageApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<MessageDto>>>
        {
            public Guid JobId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<MessageDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _context.JobMessages
                    .Where(x => x.Job.Id == request.JobId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                
                return Result<List<MessageDto>>.Success(messages);
            }
        }

    }
}