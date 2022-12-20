using System.ComponentModel.DataAnnotations;

namespace Domain.LocationAggregate
{
    public class Location
    {
        public string PropertyNumberOrName { get; set; }
        public string StreetName { get; set; }
        public string Locality { get; set; }
        public string TownOrCity { get; set; }
        public string County { get; set; }
        [Required]
        public string PostalCode { get; set; }
        public Country Country { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}