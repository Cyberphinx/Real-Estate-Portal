using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain.JobAggregate;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Domain.JobAggregate.Objects;
using Domain.AppUserAggregate.Enums;

namespace Application.JobInvoiceApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public JobInvoice JobInvoice { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.JobInvoice).SetValidator(new InvoiceValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // set Invoice datetime
                request.JobInvoice.InvoiceDate = DateTime.UtcNow;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                request.JobInvoice.SellerUsername = user.UserName;

                await _context.JobInvoices.AddAsync(request.JobInvoice);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create job invoice");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}