using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.ListingAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class DeleteRange
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string CompanyReference { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingData = await _context.Listings.ToListAsync();

                // Loop over the database contents
                foreach (Listing item in existingData)
                {
                    // If an advert is from certain agency, remove the row
                    if (item.CompanyReference == request.CompanyReference)
                    {
                        Console.WriteLine($"REMOVED: {request.CompanyReference} adverts {item.ListingReference} : {item.Pricing.Price} GBP removed\n");
                        _context.Listings.Remove(item);
                    }
                }
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete listings");

                // return something to tell the system to move on, Unit.Value means nothing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}