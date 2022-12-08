using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;

namespace Application.OrderApplication
{
    public class Seller
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public string Brief { get; set; }
        public string Logo { get; set; }
    }
}