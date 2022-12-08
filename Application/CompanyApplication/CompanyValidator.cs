using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using FluentValidation;

namespace Application.CompanyApplication
{
    public class CompanyValidator : AbstractValidator<Company>
    {
        public CompanyValidator()
        {
            RuleFor(x => x.CompanyName).NotEmpty();
            RuleFor(x => x.Usernames).NotEmpty();
            RuleFor(x => x.CompanyContacts.Email).NotEmpty();
        }
    }
}