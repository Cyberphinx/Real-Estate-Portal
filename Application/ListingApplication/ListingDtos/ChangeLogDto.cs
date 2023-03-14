using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ListingApplication.ListingDtos
{
    public class ChangeLogDto
    {
        public Guid Id { get; set; }
        public DateTime LastModified { get; set; }
        public string Description { get; set; }
    }
}