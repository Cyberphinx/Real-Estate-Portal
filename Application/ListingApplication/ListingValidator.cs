using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.ListingAggregate;
using FluentValidation;

namespace Application.ListingApplication
{
    public class ListingValidator : AbstractValidator<Listing>
    {
        public ListingValidator()
        {
            RuleFor(x => x.ListingLocation).NotEmpty();
            RuleFor(x => x.Pricing).NotEmpty();
            RuleFor(x => x.CompanyReference).NotEmpty();
        }
    }
}