using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ListingApplication.ListingDtos
{
    public class ContentDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public MediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
    }
}