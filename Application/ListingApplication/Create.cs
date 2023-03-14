using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain.ListingAggregate;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ListingApplication
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Listing Listing { get; set; }
            public string CompanyId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Listing).SetValidator(new ListingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly ICompanyAccessor _companyAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor, IUserAccessor userAccessor, IMapper mapper, ICompanyAccessor companyAccessor)
            {
                _companyAccessor = companyAccessor;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _mediaAccessor = mediaAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var listing = request.Listing;

                await _context.Listings.AddAsync(listing);

                // SaveChangesAsync actually returns the task results as an integer of the number of state entries written to the database
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create listing");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}