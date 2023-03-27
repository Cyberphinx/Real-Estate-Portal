using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.ListingApplication.ListingDtos;

namespace Application.ListingApplication
{
    public class DetailsByRef
    {
        public class Query : IRequest<Result<ListingDto>>
        {
            public string ListingReference { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ListingDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ListingDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var advert =  await _context.Listings
                    .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.ListingReference == request.ListingReference);

                return Result<ListingDto>.Success(advert);
            }
        }
    }
}