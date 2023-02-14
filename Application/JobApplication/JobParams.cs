using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.JobApplication
{
    public class JobParams : PagingParams
    {
        public DateTime AddedOn { get; set; } = DateTime.UtcNow;
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string ServiceCategory { get; set; }
        public string MinMaxPrice { get; set; }
        public string MinMaxBeds { get; set; }
        public string MapBounds { get; set; }
        public string Channel { get; set; }

    }
}