using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobInvoiceApplication
{
    public class ListAsCustomer
    {
        public class Query : IRequest<Result<List<JobInvoiceDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobInvoiceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<JobInvoiceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null) return null;

                var invoices = await _context.JobInvoices
                    .Include(x => x.Job)
                    .ThenInclude(x => x.Networks)
                    .ThenInclude(x => x.AppUser)
                    .Where(x => x.Job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer).AppUser.UserName == _userAccessor.GetUsername())
                    .ProjectTo<JobInvoiceDto>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.Index)
                    .ThenByDescending(x => x.InvoiceDate)
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<JobInvoiceDto>>.Success(invoices);
            }
        }
    }
}