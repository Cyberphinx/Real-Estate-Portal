using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Domain.InvoiceAggregate;

namespace Application.InvoiceApplication
{
    public class InvoiceValidator : AbstractValidator<Invoice>
    {
        public InvoiceValidator()
        {
            RuleFor(x => x.Amount).NotEmpty();
        }
    }
}