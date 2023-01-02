using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain.CompanyAggregate.Objects
{
    public class CompanyAddress : Location
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}