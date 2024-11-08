using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.CompanyAggregate.Objects
{
    public class CompanyDescription
    {
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Heading { get; set; }
        public string Text { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}