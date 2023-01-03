using System.ComponentModel.DataAnnotations;

namespace Domain.LocationAggregate
{
    public class Location
    {
        public string DisplayAddress { get; set; }
        public string PropertyNumberOrName { get; set; }
        public string StreetName { get; set; }
        public string Locality { get; set; }
        public string TownOrCity { get; set; }
        public string County { get; set; } 
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}