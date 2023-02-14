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
using Domain.EmployeeAggregate;

namespace Application.EmployeeApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Employee Employee { get; set; }
            public string ListingId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Employee).SetValidator(new EmployeeValidator());
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
                var employee = request.Employee;
                employee.AddedOn = DateTime.UtcNow;
                employee.Username = _userAccessor.GetUsername();

                // if listing Id is specified, then add the listing to the employee
                if (request.ListingId != null)
                {
                    // JSON string needs to be parsed into Guid
                    Guid listingGuid = Guid.Parse(request.ListingId);
                    var listing = await _context.Listings.FirstOrDefaultAsync(x => x.Id == listingGuid);

                    if (listing != null)
                    {
                        var portfolio = new KeyPerson()
                        {
                            Listing = listing,
                            Employee = employee,
                        };
                        employee.Portfolio.Add(portfolio);
                    }
                }

                await _context.Employees.AddAsync(employee);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create employee");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}