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

namespace Application.JobApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Job Job { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Job).SetValidator(new JobValidator());
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
                request.Job.AddedOn = DateTime.UtcNow;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user != null)
                {
                    var customer = new JobNetwork()
                    {
                        AppUser = user,
                        Job = request.Job,
                        Role = JobNetworkRole.Customer
                    };
                    request.Job.Networks.Add(customer);
                }

                DateTime localFinishTime = request.Job.FinishBy.ToLocalTime();
                request.Job.FinishBy = localFinishTime;

                await _context.Jobs.AddAsync(request.Job);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create job");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}