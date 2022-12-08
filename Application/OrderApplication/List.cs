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

namespace Application.OrderApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<OrderDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<OrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders
                    .OrderByDescending(x => x.OrderDate)
                    .ProjectTo<OrderDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<OrderDto>>.Success(orders);
            }
        }
    }
}