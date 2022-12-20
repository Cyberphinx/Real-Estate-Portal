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
    public class DatabaseAddOrUpdate
    {
        private readonly DataContext _context;
        
        public DatabaseAddOrUpdate(DataContext context)
        {
            _context = context;
        }

        // SALES 
        // INITIAL ADD: ONLY use once
        public async Task InitialAddSales(List<Listing> data)
        {  
            await _context.AddRangeAsync(data);
            await _context.SaveChangesAsync();
            Console.WriteLine($"TOTAL PROPERTIES FOR SALE ADDED: {data.Count()}");
        }

        // DIFF UPDATE: ALWAYS use this after the first add
        public async Task DiffUpdateSales(List<Listing> freshData, string agency)
        {
            var existingData = await _context.Listings.ToListAsync();
            // Loop over the database contents
            foreach (Listing item in existingData)
            {
                // If an advert can no longer be found we remove the row
                var advertExist = freshData.Find(x => x.ListingReference == item.ListingReference);
                if (item.Company.CompanyReference == agency && advertExist == null)
                {
                    Console.WriteLine($"REMOVED: {item.ListingReference} : {item.ListingLocation.PostalCode} : {item.Pricing.Price} GBP no longer available \n");
                    _context.Listings.Remove(item);
                }
            }
            await _context.SaveChangesAsync();

            // Loop over fresh data
            foreach(Listing item in freshData)
            {
                Console.WriteLine($"{item.ListingReference}");
                // We check if the advert exists in the database
                var existingAdvert = await _context.Listings.SingleOrDefaultAsync(x => x.ListingReference == item.ListingReference);
                if (existingAdvert != null)
                {
                    // The advert exists, then we check if the price is still the same,
                    // if not, add a message about that to the console
                    if (existingAdvert.Pricing.Price != item.Pricing.Price)
                    {
                        Console.WriteLine($"UPDATE: {item.ListingReference} : {item.ListingLocation.StreetName} PRICE CHANGED from {existingAdvert.Pricing.Price} GBP to {item.Pricing.Price} GBP \n");
                        existingAdvert.Pricing.Price = item.Pricing.Price;
                        await _context.SaveChangesAsync();
                    }
                    continue;
                }

                // If the advert doesn't exist in the database then it means it's a new advert
                Console.WriteLine($"NEW: {item.ListingReference} for {item.Pricing.Price} has been added \n");
                await _context.Listings.AddAsync(item);
                await _context.SaveChangesAsync();
            }

            Console.WriteLine($"TOTAL PROPERTIES FOR SALE: {freshData.Count()}");
        }

    }
}