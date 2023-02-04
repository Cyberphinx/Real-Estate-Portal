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
    public class DeleteMedia
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string ListingId { get; set; }
            public string ListingMediaId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMediaAccessor _mediaAccessor;
            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor)
            {
                _mediaAccessor = mediaAccessor;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // JSON string needs to be parsed into Guid
                Guid listingGuid = Guid.Parse(request.ListingId);

                var listing = await _context.Listings.Include(m => m.ListingMedia)
                    .FirstOrDefaultAsync(x => x.Id == listingGuid);

                if (listing == null) return null;

                var media = listing.ListingMedia.FirstOrDefault(x => x.Id == request.ListingMediaId);

                if (media == null) return null;

                if (media.IsMain) return Result<Unit>.Failure("You cannot delete your main image");

                var result = await _mediaAccessor.DeleteMedia(media.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting media from Cloudinary");

                listing.ListingMedia.Remove(media);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting media from API");
            }
        }
    }
}