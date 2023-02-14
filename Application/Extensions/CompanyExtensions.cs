 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using Domain.Enums;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;

namespace Application.Extensions
{
    public static class CompanyExtensions
    {
        public static IQueryable<Company> SortCompanies(this IQueryable<Company> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.DisplayName).ThenBy(p => p.Id);

            query = orderBy switch
            {
                "addedOn" => query.OrderByDescending(p => p.AddedOn).ThenByDescending(p => p.Id),
                _ => query.OrderBy(p => p.DisplayName).ThenBy(p => p.Id)
            };

            return query;
        }

        public static IQueryable<Company> SearchCompanies(this IQueryable<Company> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            string lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.DisplayName.Trim().ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Company> FilterCompanies(this IQueryable<Company> query, string serviceCategory)
        {
            // Service Category Filter

            if (string.IsNullOrEmpty(serviceCategory)) return query;

            return query.Where(x => x.ServiceCategories.Contains(serviceCategory));
        }

        public static IQueryable<Company> SearchCompaniesOnMap(this IQueryable<Company> query, string mapBounds)
        {
            if (string.IsNullOrEmpty(mapBounds)) return query;

            var bounds = mapBounds.Split(",");

            double MinLongitude = Convert.ToDouble(bounds[0]);
            double MinLatitude = Convert.ToDouble(bounds[1]);
            double MaxLongitude = Convert.ToDouble(bounds[2]);
            double MaxLatitude = Convert.ToDouble(bounds[3]);
            
            return query.Where(p => 
            p.CompanyAddress.Latitude > MinLatitude && p.CompanyAddress.Longitude > MinLongitude 
            && p.CompanyAddress.Latitude < MaxLatitude && p.CompanyAddress.Longitude < MaxLongitude);
        }
    }
}