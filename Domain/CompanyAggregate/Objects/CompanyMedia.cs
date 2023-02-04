using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.MediaAggregate;

namespace Domain.CompanyAggregate.Objects
{
    public class CompanyMedia : Media
    {
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}