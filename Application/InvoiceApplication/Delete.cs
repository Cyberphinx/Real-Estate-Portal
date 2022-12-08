using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.InvoiceApplication
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var invoice = await _context.Invoices.FindAsync(request.Id);

                if (invoice == null) return null;

                // remove from memory
                _context.Remove(invoice);

                // save changes to database
                // SaveChangesAsync actually returns an integer of state entries written to the database
                var result = await _context.SaveChangesAsync() > 0;

                // return something to tell the system to move on, Unit.Value means nothing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}