using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.CompanyApplication.CompanyDtos;
using Application.Core;
using Application.Interfaces;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.ListingAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SpidersApplication
{
    public class Import
    {
        public class Command : IRequest<Result<string>>
        {
            public List<Listing> Listings { get; set; }
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
                if (request.Listings == null) return null;

                var existingListings = await _context.Listings
                    .OrderByDescending(x => x.LastModified).ThenBy(x => x.ListingReference)
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                
                int newListingsCount = 0;
                int updatedListingsCount = 0;
                int deletedListingsCount = 0;

                if (request.Listings != null)
                {
                    if (existingListings != null)
                    {
                        // Loop over fresh data
                        foreach (var injectedListing in request.Listings)
                        {
                            Console.WriteLine($"Checking injected listing {injectedListing.SourceUri}");

                            // set company Id
                            var company = await _context.Companies
                                .ProjectTo<CompanyMinimalDto>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.CompanyReference == injectedListing.Agency);

                            injectedListing.CompanyId = company.Id;

                            var existingListing = existingListings.FirstOrDefault(x => x.SourceUri == injectedListing.SourceUri);
                            if (existingListing != null)
                            {
                                // if it already exist, update it
                                if (injectedListing.LastModified != existingListing.LastModified)
                                {
                                    updatedListingsCount++;
                                    Console.WriteLine(
                                        $"UPDATE: existing timestamp {existingListing.LastModified}, new timestamp {injectedListing.LastModified}. {injectedListing.SourceUri}");
                                    _mapper.Map(injectedListing, existingListing);
                                    var result = await _context.SaveChangesAsync() > 0;
                                    if (!result) Console.WriteLine($"Failed to save updated listing {existingListing.SourceUri}");

                                    Console.WriteLine($"{updatedListingsCount} - {existingListing.SourceUri} updated");
                                }
                            }
                            else
                            {
                                // if it doesn't exist, add new  
                                newListingsCount++;                              
                                Console.WriteLine($"NEW: {injectedListing.SourceUri}");
                                _context.Listings.Add(injectedListing);
                                var result = await _context.SaveChangesAsync() > 0;
                                if (!result) Console.WriteLine($"Failed to add new listing {injectedListing.SourceUri}");
                                
                                Console.WriteLine($"{newListingsCount} - {injectedListing.SourceUri} added");
                            }
                        }
                    }
                    else
                    {
                        // if database is empty, add all
                        Console.WriteLine($"Current database is empty");

                        foreach (var injectedListing in request.Listings)
                        {
                            // set company Id
                            var company = await _context.Companies
                                .ProjectTo<CompanyMinimalDto>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.CompanyReference == injectedListing.Agency);
                            injectedListing.CompanyId = company.Id;

                            newListingsCount++;
                            _context.Listings.Add(injectedListing);
                            var result = await _context.SaveChangesAsync() > 0;
                            if (!result) Console.WriteLine($"Failed to add new listing {injectedListing.SourceUri}");
                            
                            Console.WriteLine($"{newListingsCount} - {injectedListing.SourceUri} added");
                        }

                    }
                }

                if (existingListings != null)
                {
                    // Loop over database contents
                    foreach (var existingListing in existingListings)
                    {
                        Console.WriteLine($"Checking existing listing {existingListing.SourceUri}");
                        var match = request.Listings.Any(x => x.SourceUri == existingListing.SourceUri);
                        if (!match)
                        {
                            // if a listing can no longer be found, delete it and its associated media
                            Console.WriteLine($"DELETE: {existingListing.SourceUri}");
                            deletedListingsCount++;
                            // remove media from Cloudinary first
                            foreach (var media in existingListing.ListingMedia.ToList())
                            {
                                // deleting from Cloudinary
                                // var deleteMediaResult = await _mediaAccessor.DeleteMedia(media.Id);
                                // if (deleteMediaResult == null) Console.WriteLine($"Problem deleting {media.Id} from Cloudinary");

                                Console.WriteLine($"{media.Id} deleted");

                                // remove from listing
                                existingListing.ListingMedia.Remove(media);
                            }

                            // and then remove listing
                            Listing listing = _context.Listings.Find(existingListing.Id);
                            _context.Listings.Remove(listing);
                            var result = await _context.SaveChangesAsync() > 0;
                            if (!result) Console.WriteLine($"Failed to delete listing {existingListing.SourceUri}");

                            Console.WriteLine($"{deletedListingsCount} - {existingListing.SourceUri} deleted");
                        }
                    }
                }

                Console.WriteLine($"🎈 {request.Listings.Count()} listings injected by Sanctum Spiders (New: {newListingsCount}, Updated: {updatedListingsCount}, Deleted: {deletedListingsCount})");

                return Result<string>.Success($"Total injected listings: {request.Listings.Count()} (New: {newListingsCount}, Updated: {updatedListingsCount}, Deleted: {deletedListingsCount})");
            }
        }
    }
}