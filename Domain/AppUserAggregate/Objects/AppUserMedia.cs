using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Domain.AppUserAggregate.Objects
{
    public class AppUserMedia : Media
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}