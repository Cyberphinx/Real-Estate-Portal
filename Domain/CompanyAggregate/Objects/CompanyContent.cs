using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.CompanyAggregate
{
    public class CompanyContent
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public CompanyMediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public bool IsLogo { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

    }
}