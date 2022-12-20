using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    public class DetailedDescription
    {
        public int Id { get; set; }
        public string Heading { get; set; }
        public string Text { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public UnitOfLength Unit { get; set; }
        public double GetArea() {
            return Length * Width;
        }
        public Guid ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}