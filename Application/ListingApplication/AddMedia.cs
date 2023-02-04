using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using Application.Interfaces;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.ListingAggregate.Objects;
using Domain.MediaAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class AddMedia
    {
        public class Command : IRequest<Result<ListingMediaDto>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<ListingMediaDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;
            private readonly IListingAccessor _listingAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor, IListingAccessor listingAccessor, IMapper mapper )
            {
                _mapper = mapper;
                _listingAccessor = listingAccessor;
                _context = context;
                _mediaAccessor = mediaAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<ListingMediaDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var listing = await _context.Listings
                    .Include(m => m.ListingMedia)
                    .FirstOrDefaultAsync(x => x.Id == _listingAccessor.GetListingId());

                if (listing == null) return null;

                var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                if (mediaUploadResult == null) return Result<ListingMediaDto>.Failure("Problem adding media to Cloudinary");

                var listingPhoto = new ListingMedia
                {
                    Id = mediaUploadResult.PublicId,
                    Url = mediaUploadResult.Url,
                    Type = MediaType.Image
                };

                if (!listing.ListingMedia.Any(x => x.IsMain)) listingPhoto.IsMain = true;

                listing.ListingMedia.Add(listingPhoto);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<ListingMediaDto>.Success(listingPhoto.MapListingMediaToDto());

                return Result<ListingMediaDto>.Failure("Problem adding media to API");
            }
        }
    }
}