using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate;

namespace Domain.EmployeeAggregate
{
    public class Employee
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmployeePhoto Photo { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Landline { get; set; }
        public string Mobile { get; set; }
        public string Website { get; set; }
        public ICollection<KeyPerson> Portfolio { get; set; } = new List<KeyPerson>();
        public string Username { get; set; }
    }
}