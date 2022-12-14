using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.JobAggregate;
using FluentValidation;

namespace Application.JobApplication
{
    public class JobValidator : AbstractValidator<Job>
    {
        public JobValidator()
        {
            RuleFor(x => x.ServiceCategories).NotEmpty();
        }
    }
}