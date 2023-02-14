using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using Application.Interfaces;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using Domain.ListingAggregate.Objects;
using Domain.MediaAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class AddKeyContact
    {
        public class Command : IRequest<Result<KeyContact>>
        {
            public Guid EmployeeId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<KeyContact>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IListingAccessor _listingAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IListingAccessor listingAccessor, IMapper mapper )
            {
                _mapper = mapper;
                _listingAccessor = listingAccessor;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<KeyContact>> Handle(Command request, CancellationToken cancellationToken)
            {
                var listing = await _context.Listings
                    .Include(m => m.KeyContacts)
                    .FirstOrDefaultAsync(x => x.Id == _listingAccessor.GetListingId());

                if (listing == null) return null;

                var keyPerson = await _context.KeyPersons
                    .FirstOrDefaultAsync(x => x.EmployeeId == request.EmployeeId);

                if (keyPerson == null) return null;

                listing.KeyContacts.Add(keyPerson);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<KeyContact>.Success(keyPerson.MapKeyPersonToKeyContact());

                return Result<KeyContact>.Failure("Problem adding key contact person to listing");
            }
        }
    }
}