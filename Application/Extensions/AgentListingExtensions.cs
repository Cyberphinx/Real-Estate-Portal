 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;

namespace Application.Extensions
{
    public static class AgentListingExtensions
    {
        public static IQueryable<Listing> Branch(this IQueryable<Listing> query, Guid companyId)
        {
            if (string.IsNullOrWhiteSpace(companyId.ToString())) return query;

            query = query.Where(x => x.CompanyId == companyId);

            return query;
        }

        public static IQueryable<Listing> SortAgentListing(this IQueryable<Listing> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderByDescending(p => p.AddedOn).ThenByDescending(p => p.Id);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Pricing.Price).ThenBy(p => p.Id),
                "priceDesc" => query.OrderByDescending(p => p.Pricing.Price).ThenByDescending(p => p.Id),
                _ => query.OrderByDescending(p => p.AddedOn).ThenByDescending(p => p.Id)
            };

            return query;
        }

        public static IQueryable<Listing> SearchAgentListing(this IQueryable<Listing> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            string lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.ListingReference.Trim().ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Listing> FilterAgentListing(this IQueryable<Listing> query, string channel,
            string propertyTypes, string minMaxPrice, string minMaxBeds)
        {
            var propertyTypeList = new List<string>();
            var typeList = new List<PropertyType>();

            var minMaxPriceList = new List<string>();
            var priceList = new List<int>();

            var minMaxBedroomList = new List<string>();
            var bedList = new List<int>();

            double priceCeiling = 0;
            int priceCeilingRounded = 0;
            int bedroomsCeiling = 0;

            // Transaction Type Filter
            switch (channel)
            {
                case "rent":
                    query = query.Where(x => x.Pricing.TransactionType == TransactionType.Rent);
                    break;
                case "sale":
                    query = query.Where(x => x.Pricing.TransactionType == TransactionType.Sale);
                    break;
                default:
                    query = query.Where(x => x.Pricing.TransactionType == TransactionType.Sale);
                    break;
            }


            // Property Type Filter

            if (!string.IsNullOrEmpty(propertyTypes))
                propertyTypeList.AddRange(propertyTypes.ToLower().Split(",").ToList());

            foreach (var item in propertyTypeList)
            {
                PropertyType result = (PropertyType)Enum.Parse(typeof(PropertyType), item, true);
                typeList.Add(result);
            }
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.PropertyType));


            // Check for maximum values
            if (query.Any())
            {
                priceCeiling = query.Max(p => p.Pricing.Price);
                priceCeilingRounded = (int)Math.Ceiling(priceCeiling);
                bedroomsCeiling = query.Max(p => p.TotalBedrooms);
            }


            // Price Filter
            if (!string.IsNullOrEmpty(minMaxPrice))
                minMaxPriceList.AddRange(minMaxPrice.ToLower().Split(",").ToList());

            foreach (var item in minMaxPriceList)
            {
                int result = Int32.Parse(item);
                priceList.Add(result);
            }
            if (priceList.Count > 1)
            {
                bool invalidMaxPrice = priceList[1] < priceList[0];
                bool zeroMaxPrice = priceList[1] == 0;
                if (invalidMaxPrice || zeroMaxPrice) priceList[1] = priceCeilingRounded;
                
                query = query.Where(p => p.Pricing.Price >= priceList[0] && p.Pricing.Price <= priceList[1]);
            }


            // Bedrooms Filter
            if (!string.IsNullOrEmpty(minMaxBeds))
            {
                minMaxBedroomList.AddRange(minMaxBeds.ToLower().Split(",").ToList());
            }
            
            foreach (var item in minMaxBedroomList)
            {
                int result = Int32.Parse(item);
                bedList.Add(result);
            }
            if (bedList.Count > 1)
            {
                bool invalidMaxBed = bedList[1] < bedList[0];
                bool zeroMaxBed = bedList[1] == 0;
                if (invalidMaxBed || zeroMaxBed) bedList[1] = bedroomsCeiling;
                
                query = query.Where(p => p.TotalBedrooms >= bedList[0] && p.TotalBedrooms <= bedList[1]);
            }

            return query;
        }

        public static IQueryable<Listing> SearchMapAgentListing(this IQueryable<Listing> query, string mapBounds)
        {
            if (string.IsNullOrEmpty(mapBounds)) return query;

            var bounds = mapBounds.Split(",");

            double MinLongitude = Convert.ToDouble(bounds[0]);
            double MinLatitude = Convert.ToDouble(bounds[1]);
            double MaxLongitude = Convert.ToDouble(bounds[2]);
            double MaxLatitude = Convert.ToDouble(bounds[3]);
            
            return query.Where(p => 
            p.ListingLocation.Latitude > MinLatitude && p.ListingLocation.Longitude > MinLongitude 
            && p.ListingLocation.Latitude < MaxLatitude && p.ListingLocation.Longitude < MaxLongitude);
        }
    }
}