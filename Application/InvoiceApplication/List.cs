using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.JobApplication.JobDtos;
using Application.ProfileApplication.ProfileDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.InvoiceApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<InvoiceDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<InvoiceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<InvoiceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var invoices = await _context.Invoices
                    .OrderByDescending(x => x.InvoiceDate).ThenBy(x => x.Id)
                    .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsSplitQuery()
                    .ToListAsync();

                return Result<List<InvoiceDto>>.Success(invoices);
            }
        }
    }
}