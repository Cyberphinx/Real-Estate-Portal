using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.CalendarAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CalendarApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<CalendarEvent>>> 
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CalendarEvent>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CalendarEvent>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Events
                    .Where(x => x.Username == request.Username)
                    .OrderByDescending(x => x.EventDate).ThenBy(x => x.Id)
                    .ToListAsync();

                return Result<List<CalendarEvent>>.Success(events);
            }
        }
    }
}