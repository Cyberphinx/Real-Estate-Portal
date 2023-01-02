using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ListingApplication.ListingDtos
{
    public class DetailedDescriptionDto
    {
        public Guid Id { get; set; }
        public string Heading { get; set; }
        public string Text { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public UnitOfLength Unit { get; set; }
        public double Area { get; set; }
    }
}