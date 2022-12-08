using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.CompanyAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AvailabilityApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Availability Availability { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Availability).SetValidator(new AvailabilityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies
                    .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Usernames.Contains(_userAccessor.GetUsername()));

                request.Availability.CompanyId = company.Id;
                DateTime localStartTime = request.Availability.StartTime.ToLocalTime();
                DateTime localEndTime = request.Availability.EndTime.ToLocalTime();

                request.Availability.StartTime = localStartTime;
                request.Availability.EndTime = localEndTime;

                // Console.WriteLine($"Backend receives {localStartTime} and {localEndTime}");

                await _context.Availabilities.AddAsync(request.Availability);

                // SaveChangesAsync actually returns an integer of state entries written to the database
                var result = await _context.SaveChangesAsync() > 0;

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}