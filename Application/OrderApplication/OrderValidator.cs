using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.OrderAggregate;
using FluentValidation;

namespace Application.OrderApplication
{
    public class OrderValidator : AbstractValidator<Order>
    {
        public OrderValidator()
        {
            RuleFor(x => x.BuyerName).NotEmpty();
            RuleFor(x => x.BuyerEmail).NotEmpty();
            RuleFor(x => x.StartTime).NotEmpty();
            RuleFor(x => x.OrderDate).NotEmpty();
        }
    }
}