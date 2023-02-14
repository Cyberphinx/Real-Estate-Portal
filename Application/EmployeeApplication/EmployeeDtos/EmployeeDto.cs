using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CompanyApplication;

namespace Application.EmployeeApplication.EmployeeDtos
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Landline { get; set; }
        public string Mobile { get; set; }
        public string Website { get; set; }
        public ICollection<Stock> Portfolio { get; set; }
        public string Username { get; set; }
    }
}