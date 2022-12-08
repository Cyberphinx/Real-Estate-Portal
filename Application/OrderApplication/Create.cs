using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain.OrderAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Order Order { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Order).SetValidator(new OrderValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.Order.OrderDate = DateTime.Now;
                // request.Order.BuyerId = _userAccessor.GetUsername();

                DateTime localStartTime = request.Order.StartTime.ToLocalTime();
                DateTime localEndTime = request.Order.EndTime.ToLocalTime();

                request.Order.StartTime = localStartTime;
                request.Order.EndTime = localEndTime;

                await _context.Orders.AddAsync(request.Order);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create order");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}