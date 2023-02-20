using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using Application.Interfaces;
using Application.JobApplication.JobDtos;
using AutoMapper;
using Domain.JobAggregate.Objects;
using Domain.MediaAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobApplication
{
    public class AddMedia
    {
        public class Command : IRequest<Result<JobMediaDto>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<JobMediaDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;
            private readonly IJobAccessor _jobAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor, IJobAccessor jobAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _jobAccessor = jobAccessor;
                _context = context;
                _mediaAccessor = mediaAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<JobMediaDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs
                    .Include(m => m.JobMedia)
                    .FirstOrDefaultAsync(x => x.Id == _jobAccessor.GetJobId());

                if (job == null) return null;

                var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                if (mediaUploadResult == null) return Result<JobMediaDto>.Failure("Problem adding media to Cloudinary");

                var jobMedia = new JobMedia
                {
                    Id = mediaUploadResult.PublicId,
                    Url = mediaUploadResult.Url,
                    Type = MediaType.Image,
                    Index = 0,
                    IsMain = false
                };

                if (job.JobMedia.Count() > 0)
                {
                    var lastMedia = job.JobMedia.OrderBy(x => x.Index).LastOrDefault();
                    jobMedia.Index = lastMedia.Index + 1;
                }

                job.JobMedia.Add(jobMedia);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<JobMediaDto>.Success(jobMedia.MapJobMediaToDto());

                return Result<JobMediaDto>.Failure("Problem adding media to API");
            }
        }
    }
}