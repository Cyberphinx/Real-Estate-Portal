using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SpidersApplication
{
    public class Purge
    {
        public class Command : IRequest<Result<string>>
        {
            public string Agency { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IMediaAccessor _mediaAccessor;
            public Handler(DataContext context, IMapper mapper, IMediaAccessor mediaAccessor)
            {
                _mediaAccessor = mediaAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Agency == null) return null;

                int deleteCount = 0;

                var injection = await _context.Injections.FirstOrDefaultAsync(x => x.Agency == request.Agency);
                Console.WriteLine($"Spider Tag is: {injection.SpiderTag}");

                var agencyListings = await _context.Listings
                    .Where(x => x.Agency == request.Agency)
                    .OrderBy(x => x.LastModified).ThenBy(x => x.ListingReference)
                    .ToListAsync();

                // if a listing's spiderTag is out of sync, delete it and its associated media
                if (agencyListings != null)
                {
                    foreach (var listing in agencyListings)
                    {
                        if (listing.SpiderTag != injection.SpiderTag)
                        {
                            // if spider tag is not the same as the one in the injection record, we delete it
                            deleteCount++;
                            // remove media first
                            foreach (var media in listing.ListingMedia.ToList())
                            {
                                // remove from listing
                                Console.WriteLine($"{media.Id} deleted");
                                listing.ListingMedia.Remove(media);
                            }

                            // and then remove listing
                            _context.Listings.Remove(listing);
                            var result = await _context.SaveChangesAsync() > 0;
                            if (!result) Console.WriteLine($"Failed to delete listing {listing.SourceUri}");

                            Console.WriteLine($"{deleteCount} - {listing.SourceUri} deleted");
                        }
                    }
                }

                Console.WriteLine($"🎈 {deleteCount} {request.Agency} legacy listings purged from Sanctum!");

                return Result<string>.Success($"🎈 {deleteCount} {request.Agency} legacy listings purged from Sanctum!");
            }
        }
    }
}