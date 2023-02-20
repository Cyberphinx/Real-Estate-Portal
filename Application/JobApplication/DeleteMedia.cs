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
    public class DeleteMedia
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string JobId { get; set; }
            public string JobMediaId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMediaAccessor _mediaAccessor;
            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor)
            {
                _mediaAccessor = mediaAccessor;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // JSON string needs to be parsed into Guid
                Guid jobGuid = Guid.Parse(request.JobId);

                var job = await _context.Jobs.Include(m => m.JobMedia)
                    .FirstOrDefaultAsync(x => x.Id == jobGuid);

                if (job == null) return null;

                var media = job.JobMedia.FirstOrDefault(x => x.Id == request.JobMediaId);

                if (media == null) return null;

                if (media.IsMain) return Result<Unit>.Failure("You cannot delete your main image");

                var result = await _mediaAccessor.DeleteMedia(media.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting media from Cloudinary");

                job.JobMedia.Remove(media);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting media from API");
            }
        }
    }
}