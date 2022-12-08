using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CityCoordinates
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Country { get; set; }
        public string Iso { get; set; }
        public string Region { get; set; }
        public bool Capital { get; set; }
    }
}