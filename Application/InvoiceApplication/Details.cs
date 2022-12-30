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

namespace Application.InvoiceApplication
{
    public class Details
    {
        public class Query : IRequest<Result<InvoiceDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<InvoiceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<InvoiceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var invoice =  await _context.Invoices
                    .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<InvoiceDto>.Success(invoice);
            }
        }
    }
}