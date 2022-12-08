using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Photo
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public string Url { get; set; }
    }
}