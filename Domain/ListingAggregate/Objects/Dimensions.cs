using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.ListingAggregate.Objects
{
    [Owned]
    public class Dimensions
    {
        public double Length { get; set; }
        public double Width { get; set; }
        public UnitOfLength Unit { get; set; }
        public double GetArea() {
            return Length * Width;
        }
    }
}