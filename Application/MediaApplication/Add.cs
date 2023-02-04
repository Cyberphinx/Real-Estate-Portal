using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain.AppUserAggregate.Objects;
using Domain.MediaAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MediaApplication
{
    public class Add
    {
        public class Command : IRequest<Result<AppUserMedia>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<AppUserMedia>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;
            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<AppUserMedia>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                var appUserPhoto = new AppUserMedia
                {
                    Id = mediaUploadResult.PublicId,
                    Url = mediaUploadResult.Url,
                    Type = MediaType.Image
                };

                if (!user.Photos.Any(x => x.IsMain)) appUserPhoto.IsMain = true;

                user.Photos.Add(appUserPhoto);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<AppUserMedia>.Success(appUserPhoto);

                return Result<AppUserMedia>.Failure("Problem adding media");
            }
        }
    }
}