using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain.JobAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Domain.CalendarAggregate;
using Domain.AppUserAggregate.Enums;

namespace Application.CalendarApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CalendarEvent Event { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Event.EventDate).NotEmpty();
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                request.Event.Username = user.UserName;

                Console.WriteLine($"Original date: {request.Event.EventDate}");

                await _context.Events.AddAsync(request.Event);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}