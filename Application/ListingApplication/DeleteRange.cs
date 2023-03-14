using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;
            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _mediaAccessor = mediaAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingData = await _context.Listings
                    .Where(x => x.CompanyId == request.CompanyId)
                    .ToListAsync();

                // Loop over the database contents
                foreach (Listing listing in existingData)
                {
                    foreach (var media in listing.ListingMedia)
                    {
                        var mediaResult = await _mediaAccessor.DeleteMedia(media.Id);
                        if (mediaResult == null) Console.WriteLine("Failed to delete media from Cloudinary");
                    }
                    _context.Listings.Remove(listing);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete listings");

                // return something to tell the system to move on, Unit.Value means nothing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}