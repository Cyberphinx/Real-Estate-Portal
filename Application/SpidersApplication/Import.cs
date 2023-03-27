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
using Domain;
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
                var startTime = DateTime.UtcNow;

                if (request.Listings == null) return null;

                // get the web sraping signature (spider tag)
                var spiderTag = request.Listings[0].SpiderTag;
                var agency = request.Listings[0].Agency;
                Console.WriteLine($"Injection spider tag is: {spiderTag}");
                var existingSpiderTag = await _context.Injections.AnyAsync(x => x.SpiderTag == spiderTag && x.Agency == agency);
                if (!existingSpiderTag)
                {
                    // the spider tag (web scraping signature) cannot be found in the injection records of the agency, 
                    // then create a new record for this web scraping cycle
                    Injection injection = new Injection
                    {
                        AddedOn = DateTime.UtcNow,
                        Agency = agency,
                        SpiderTag = spiderTag
                    };
                    _context.Injections.Add(injection);
                    var result = await _context.SaveChangesAsync() > 0;
                    if (!result) Console.WriteLine("Failed to add spider tag");
                }

                // get company Id
                var company = await _context.Companies
                    .ProjectTo<CompanyMinimalDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.CompanyReference == agency);
                var companyId = company.Id;

                // Add or Update listings
                int newCount = 0;
                int updateCount = 0;
                int noChangeCount = 0;
                // int deleteCount = 0; // deletion is handled by Purge.cs

                // check if fresh data is not empty
                if (request.Listings != null)
                {
                    // Loop over fresh data
                    foreach (var injectedListing in request.Listings)
                    {
                        Console.WriteLine($"Checking injected listing {injectedListing.SourceUri}");

                        // set Company Id to all fresh data
                        injectedListing.CompanyId = companyId;

                        var existingListing = await _context.Listings
                            .Include(x => x.ChangeLogs)
                            .Include(x => x.DetailedDescriptions)
                            .Include(x => x.KeyContacts)
                            .Include(x => x.ListingLocation)
                            .Include(x => x.ListingMedia)
                            .Include(x => x.Pricing)
                            .Include(x => x.ServiceCharge)
                            .Include(x => x.Watchers)
                            .FirstOrDefaultAsync(x => x.SourceUri == injectedListing.SourceUri);

                        if (existingListing != null)
                        {
                            // if it already exist, and its lastModified date is different, then update it
                            if (injectedListing.LastModified != existingListing.LastModified)
                            {
                                Console.WriteLine(
                                    $"UPDATE: existing timestamp {existingListing.LastModified}, new timestamp {injectedListing.LastModified}. {injectedListing.SourceUri}");

                                // no need to remove listing media individually, unless they are hosted on a cloud storage
                                // (remember to .Include listing media)
                                // if (existingListing.ListingMedia != null)
                                // {
                                //     foreach (var media in existingListing.ListingMedia.ToList())
                                //     {
                                //         Console.WriteLine($"Remove {media.Id} - {media.CopyFromUrl}");
                                //         existingListing.ListingMedia.Remove(media);
                                //     }
                                // }

                                Console.WriteLine($"Remove {existingListing.ListingReference} - {existingListing.SourceUri}");
                                _context.Remove(existingListing);

                                Console.WriteLine($"Replace by {injectedListing.ListingReference} - {injectedListing.SourceUri}");
                                _context.Add(injectedListing);

                                // mapper doesn't work because the entities are not from the same database for "HttpPut" function
                                // _mapper.Map(injectedListing, existingListing);

                                var result = await _context.SaveChangesAsync() > 0;
                                if (!result) Console.WriteLine($"Failed to save updated listing {injectedListing.SourceUri}");

                                Console.WriteLine($"{updateCount} - {injectedListing.ListingReference} - {injectedListing.SourceUri} updated");

                                updateCount++;
                            }
                            else
                            {
                                noChangeCount++;
                            }
                        }
                        else
                        {
                            // if it doesn't exist, add new  
                            newCount++;

                            Console.WriteLine($"NEW: {injectedListing.SourceUri}");
                            _context.Listings.Add(injectedListing);
                            var result = await _context.SaveChangesAsync() > 0;
                            if (!result) Console.WriteLine($"Failed to add new listing {injectedListing.SourceUri}");

                            Console.WriteLine($"{newCount} - {injectedListing.ListingReference} - {injectedListing.SourceUri} added");
                        }
                    }
                }

                var endTime = DateTime.UtcNow;

                Console.WriteLine($"🎈 {DateTime.Now} - {spiderTag}: {request.Listings.Count()} {request.Listings[0].Agency} listings injected from Sanctum Spiders (New: {newCount}, Unchanged: {noChangeCount}, Updated: {updateCount}). (Time spent: {(endTime - startTime).TotalMinutes} minutes, Start time: {startTime} - endTime: {endTime}). Don't forget to purge legacy listings after all injections have been completed.");

                return Result<string>.Success($"🎈 {DateTime.Now} - {spiderTag}: {request.Listings.Count()} {request.Listings[0].Agency} listings injected from Sanctum Spiders (New: {newCount}, Unchanged: {noChangeCount}, Updated: {updateCount}). (Time spent: {(endTime - startTime).TotalMinutes} minutes, Start time: {startTime} - endTime: {endTime}). Don't forget to purge legacy listings after all injections have been completed.");
            }
        }
    }
}