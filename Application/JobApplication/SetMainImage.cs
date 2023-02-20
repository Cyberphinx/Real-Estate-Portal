using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobApplication
{
    public class SetMainImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string JobId { get; set; }
            public string JobMediaId { get; set; }
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
                // JSON string needs to be parsed into Guid
                Guid jobGuid = Guid.Parse(request.JobId);

                var job = await _context.Jobs.Include(m => m.JobMedia)
                    .FirstOrDefaultAsync(x => x.Id == jobGuid);

                if (job == null) return null;

                var image = job.JobMedia.FirstOrDefault(x => x.Id == request.JobMediaId);

                if (image == null) return null;

                var currentMain = job.JobMedia.FirstOrDefault(x => x.IsMain);
                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    if (currentMain.Index == 0)
                    {
                        if (image.Index == 0)
                        {
                            currentMain.Index = job.JobMedia.Count();
                        }
                        currentMain.Index = image.Index;
                    }
                }

                image.IsMain = true;
                image.Index = 0;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}