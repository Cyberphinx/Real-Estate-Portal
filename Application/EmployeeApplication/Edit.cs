using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.EmployeeAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.EmployeeApplication
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Employee Employee { get; set; }
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var employee = await _context.Employees
                    .Where(x => x.Id == request.Employee.Id)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                if (employee == null) return null;

                // matching the property from the request to the database entity, ie. updating it
                _mapper.Map(request.Employee, employee);

                // save changes to database
                // number of changes is greater than 0
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update employee");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}