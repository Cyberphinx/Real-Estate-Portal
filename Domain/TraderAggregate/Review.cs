using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Review
    {
        public Guid Id { get; set; }
        public Customer Customer { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime Date { get; set; }
        public Trade Trade { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ReviewStatus ReviewStatus { get; set; }
    }
}