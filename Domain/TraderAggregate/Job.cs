using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Job
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Trade Category { get; set; }
        public string Title { get; set; }
        public List<string> Description { get; set; }
        public string CustomerDescription { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string Location { get; set; }
        public string PostedBy { get; set; }
        public ICollection<Trader> InterestedTrader { get; set; }
        public ICollection<Trader> InvitedTrader { get; set; }

    }
}