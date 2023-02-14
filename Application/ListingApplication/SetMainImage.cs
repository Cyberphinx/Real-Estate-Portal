using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class SetMainImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string ListingId { get; set; }
            public string ListingMediaId { get; set; }
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
                // JSON string needs to be parsed into Guid
                Guid listingGuid = Guid.Parse(request.ListingId);

                var listing = await _context.Listings.Include(m => m.ListingMedia)
                    .FirstOrDefaultAsync(x => x.Id == listingGuid);

                if (listing == null) return null;

                var image = listing.ListingMedia.FirstOrDefault(x => x.Id == request.ListingMediaId);

                if (image == null) return null;

                var currentMain = listing.ListingMedia.FirstOrDefault(x => x.IsMain);
                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    if (currentMain.Index == 0)
                    {
                        if (image.Index == 0)
                        {
                            currentMain.Index = listing.ListingMedia.Count();
                        }
                        currentMain.Index = image.Index;
                    }
                }

                image.IsMain = true;
                image.Index = 0;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}