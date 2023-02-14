using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.EmployeeAggregate;
using Domain.JobAggregate;
using FluentValidation;

namespace Application.EmployeeApplication
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Mobile).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
        }
    }
}