// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading;
// using System.Threading.Tasks;
// using Application.Core;
// using Application.Interfaces;
// using AutoMapper;
// using Domain;
// using Domain.InvoiceAggregate;
// using FluentValidation;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

// namespace Application.JobInvoiceApplication
// {
//     public class Edit
//     {
//         public class Command : IRequest<Result<Unit>>
//         {
//             public Invoice Invoice { get; set; }
//         }

//         public class CommandValidator : AbstractValidator<Command>
//         {
//             public CommandValidator()
//             {
//                 RuleFor(x => x.Invoice).SetValidator(new InvoiceValidator());
//             }
//         }

//         public class Handler : IRequestHandler<Command, Result<Unit>>
//         {
//             private readonly DataContext _context;
//             private readonly IMapper _mapper;
//             private readonly IUserAccessor _userAccessor;
//             public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
//             {
//                 _userAccessor = userAccessor;
//                 _mapper = mapper;
//                 _context = context;
//             }

//             public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
//             {
//                 var invoice = await _context.Invoices.Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == request.Invoice.Id);
//                 if (invoice == null) return null;

//                 // matching the property from the request to the database entity, ie. updating it
//                 _mapper.Map(request.Invoice, invoice);

//                 // save changes to database
//                 // number of changes is greater than 0
//                 var result = await _context.SaveChangesAsync() > 0;

//                 if (!result) return Result<Unit>.Failure("Failed to update order");

//                 return Result<Unit>.Success(Unit.Value);
//             }
//         }
//     }
// }