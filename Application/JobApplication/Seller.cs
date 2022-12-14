using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;

namespace Application.JobApplication
{
    public class Seller
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public ICollection<CompanyContent> CompanyContents { get; set; }
        public ICollection<CompanyDescription> CompanyDescriptions { get; set; }
        public string DisplayName { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public CompanyAddress CompanyAddress { get; set; }
        public CompanyContacts CompanyContacts { get; set; }
        public string SummaryDescription { get; set; }

    }
}