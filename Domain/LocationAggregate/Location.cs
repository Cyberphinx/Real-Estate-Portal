using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate;

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
        public Coordinates Coordinates { get; set; }
        public string What3words { get; set; }
    }
}