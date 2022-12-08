using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain.CompanyAggregate;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CompanyApplication
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Company Company { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Company).SetValidator(new CompanyValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                // if (user == null) return null;

                var company = await _context.Companies.FindAsync(request.Company.Id);
                if (company == null) return null;

                // matching the property from the request to the database entity, ie. updating it
                _mapper.Map(request.Company, company);

                // company.CompanyOwnerId = user.UserName;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update company");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}