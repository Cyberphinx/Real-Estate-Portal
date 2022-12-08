using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.AvailabilityApplication
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
                var availability = await _context.Availabilities.FindAsync(request.Id);

                if (availability == null) return null;

                // remove from memory
                _context.Remove(availability);

                // save changes to database
                // SaveChangesAsync actually returns an integer of state entries written to the database
                var result = await _context.SaveChangesAsync() > 0;

                // return something to tell the system to move on, Unit.Value means nothing.
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}