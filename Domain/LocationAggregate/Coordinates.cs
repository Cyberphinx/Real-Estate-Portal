using Microsoft.EntityFrameworkCore;

namespace Domain.LocationAggregate
{
    [Owned]
    public class Coordinates
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}