using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using Domain.ListingAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Listing Listing { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Listing).SetValidator(new ListingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var listing = await _context.Listings.Include(x => x.ListingMedia).FirstOrDefaultAsync(x => x.Id == request.Listing.Id);
                // .FindAsync(request.Listing.Id);

                if (listing == null) return null;

                // matching the listing from the request to the database entity, ie. updating it
                _mapper.Map(request.Listing, listing);

                // save changes to database
                // number of changes is greater than 0
                var result = await _context.SaveChangesAsync() > 0; 

                if (!result) return Result<Unit>.Failure("Failed to update sales advert");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}