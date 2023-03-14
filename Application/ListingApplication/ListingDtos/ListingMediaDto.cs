using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Application.ListingApplication.ListingDtos
{
    public class ListingMediaDto
    {
        public string Id { get; set; }
        public int Index { get; set; }
        public string Url { get; set; }
        public string CopyFromUrl { get; set; }
        public MediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public Guid ListingId { get; set; }
    }
}