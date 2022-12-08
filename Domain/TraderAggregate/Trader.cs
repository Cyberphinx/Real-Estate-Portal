using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.TraderAggregate
{
    public class Trader
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string BusinessName { get; set; }
        public string TradingName { get; set; }
        public string CompanyType { get; set; }
        public ICollection<Trade> Trades { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public DateTime Added { get; set; }
        public string Website { get; set; }
        public string Introduction { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string About { get; set; }
        public ICollection<Review> Feedbacks { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
        public ICollection<Insurance> Insurances { get; set; }
    }
}