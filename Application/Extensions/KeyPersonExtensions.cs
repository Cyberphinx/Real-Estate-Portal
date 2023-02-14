using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ListingApplication.ListingDtos;
using Domain;
using Domain.ListingAggregate.Objects;

namespace Application.Extensions
{
    public static class KeyPersonExtensions
    {
        public static KeyContact MapKeyPersonToKeyContact(this KeyPerson keyPerson)
        {
            return new KeyContact
            {
                Id = keyPerson.EmployeeId,
                AddedOn = keyPerson.Employee.AddedOn,
                FirstName = keyPerson.Employee.FirstName,
                LastName = keyPerson.Employee.LastName,
                Photo = keyPerson.Employee.Photo.Url,
                JobTitle = keyPerson.Employee.JobTitle,
                Description = keyPerson.Employee.Description,
                Email = keyPerson.Employee.Email,
                Landline = keyPerson.Employee.Landline,
                Mobile = keyPerson.Employee.Mobile,
                Website = keyPerson.Employee.Website,
            };
        }
    }
}