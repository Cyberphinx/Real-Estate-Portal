using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Domain.InvoiceAggregate;
using Domain.JobAggregate.Objects;

namespace Application.JobInvoiceApplication
{
    public class InvoiceValidator : AbstractValidator<JobInvoice>
    {
        public InvoiceValidator()
        {
            RuleFor(x => x.Amount).NotEmpty();
        }
    }
}