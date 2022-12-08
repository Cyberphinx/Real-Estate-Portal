using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.ListingAggregate;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Extensions
{
    public class DatabaseDelete
    {
        private readonly DataContext _context;

        public DatabaseDelete(DataContext context)
        {
            _context = context;
        }

        public async Task DeleteCertainListings(string agency)
        {
            var existingData = await _context.Listings.ToListAsync();

            // Loop over the database contents
            foreach (Listing item in existingData)
            {
                // If an advert is from certain agency, remove the row
                if (item.CompanyReference == agency)
                {
                    Console.WriteLine($"REMOVED: {agency} adverts {item.ListingReference} : {item.ListingLocation.StreetName} : {item.Pricing.Price} GBP removed\n");
                    _context.Listings.Remove(item);
                }
            }
            await _context.SaveChangesAsync();
        }

        // public async Task DeleteCertainSalesImages(string agency)
        // {
        //     var existingData = await _context.SalesImages.ToListAsync();

        //     // Loop over the database contents
        //     foreach (SalesImage item in existingData)
        //     {
        //         // If an advert is from certain agency, remove the row
        //         if (item.Url.Contains(agency))
        //         {
        //             Console.WriteLine($"REMOVED: {item.Ref} removed\n");
        //             _context.SalesImages.Remove(item);
        //         }
        //     }
        //     await _context.SaveChangesAsync();
        // }

        // public async Task DeleteAllSalesImages()
        // {
        //     var existingData = await _context.SalesImages.ToListAsync();

        //     // Loop over the database contents
        //     foreach (SalesImage item in existingData)
        //     {
        //         Console.WriteLine($"REMOVED: {item.Ref} removed\n");
        //         _context.SalesImages.Remove(item);
        //     }
        //     await _context.SaveChangesAsync();
        // }
    }
}