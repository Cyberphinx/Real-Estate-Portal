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
            RuleFor(x => x.LegalName).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.CompanyContacts.Email).NotEmpty();
        }
    }
}