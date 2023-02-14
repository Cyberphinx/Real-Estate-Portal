 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using Domain.Enums;
using Domain.JobAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;

namespace Application.Extensions
{
    public static class JobExtensions
    {
        public static IQueryable<Job> SortJobs(this IQueryable<Job> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.AddedOn).ThenBy(p => p.Id);

            query = orderBy switch
            {
                "finishBy" => query.OrderBy(p => p.FinishBy).ThenBy(p => p.Id),
                _ => query.OrderBy(p => p.AddedOn).ThenBy(p => p.Id)
            };

            return query;
        }

        public static IQueryable<Job> SearchJobTitles(this IQueryable<Job> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            string lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Title.Trim().ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Job> FilterJobs(this IQueryable<Job> query, string serviceCategory)
        {
            // Service Category Filter

            if (string.IsNullOrEmpty(serviceCategory)) return query;

            return query.Where(x => x.ServiceCategories.Contains(serviceCategory));
        }

        public static IQueryable<Job> SearchJobsOnMap(this IQueryable<Job> query, string mapBounds)
        {
            if (string.IsNullOrEmpty(mapBounds)) return query;

            var bounds = mapBounds.Split(",");

            double MinLongitude = Convert.ToDouble(bounds[0]);
            double MinLatitude = Convert.ToDouble(bounds[1]);
            double MaxLongitude = Convert.ToDouble(bounds[2]);
            double MaxLatitude = Convert.ToDouble(bounds[3]);

            return query.Where(p => 
            p.JobLocations.FirstOrDefault(x => x.Index == 0).Latitude > MinLatitude 
            && p.JobLocations.FirstOrDefault(x => x.Index == 0).Longitude > MinLongitude 
            && p.JobLocations.FirstOrDefault(x => x.Index == 0).Latitude < MaxLatitude 
            && p.JobLocations.FirstOrDefault(x => x.Index == 0).Longitude < MaxLongitude);
        }
    }
}