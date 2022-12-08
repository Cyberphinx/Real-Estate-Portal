using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using FluentValidation;

namespace Application.AvailabilityApplication
{
    public class AvailabilityValidator : AbstractValidator<Availability>
    {
        public AvailabilityValidator()
        {
            RuleFor(x => x.StartTime).NotEmpty();
            RuleFor(x => x.EndTime).NotEmpty();
        }
    }
}