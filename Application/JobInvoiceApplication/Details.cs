using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.ListingApplication.ListingDtos;
using Application.ProfileApplication.ProfileDtos;
using Application.Interfaces;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication.JobInvoiceDtos;

namespace Application.JobInvoiceApplication
{
    public class Details
    {
        public class Query : IRequest<Result<JobInvoiceDto>>
        {
            public Guid InvoiceId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<JobInvoiceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<JobInvoiceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var invoice =  await _context.JobInvoices
                    .ProjectTo<JobInvoiceDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.Id == request.InvoiceId);

                return Result<JobInvoiceDto>.Success(invoice);
            }
        }
    }
}