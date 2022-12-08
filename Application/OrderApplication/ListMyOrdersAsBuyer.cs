using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderApplication
{
    public class ListMyOrdersAsBuyer
    {
        public class Query : IRequest<Result<List<OrderDto>>>
        {
            // public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<OrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders
                    .Where(x => x.BuyerEmail == _userAccessor.GetEmail())
                    .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                    .AsNoTracking()
                    .ToListAsync();

                if (orders == null) return Result<List<OrderDto>>.Failure("No orders found");

                return Result<List<OrderDto>>.Success(orders);
            }
        }
    }
}