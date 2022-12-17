using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate.Enums;
using Domain.Enums;

namespace Domain
{
    public class Review
    {
        public string ReviewerDisplayName { get; set; }
        public string ReviewerUsername { get; set; }
        public string ReviewerEmail { get; set; }
        public string ReviewerPhone { get; set; }
        public DateTime AddedOn { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ReviewStatus ReviewStatus { get; set; }
    }
}