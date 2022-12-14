using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ListingApplication
{
    public class DetailedDescriptionDto
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public string Heading { get; set; }
        public DimensionsDto Dimensions { get; set; }
        public string Text { get; set; }
        public Guid ListingId { get; set; }
    }
}