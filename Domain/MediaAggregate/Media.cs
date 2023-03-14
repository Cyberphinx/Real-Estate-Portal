using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Domain.MediaAggregate
{
    public class Media
    {
        // id from Cloudinary
        public string Id { get; set; }
        public int Index { get; set; }
        public string Url { get; set; }
        public string CopyFromUrl { get; set; }
        public MediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public bool IsLogo { get; set; }
    }
}