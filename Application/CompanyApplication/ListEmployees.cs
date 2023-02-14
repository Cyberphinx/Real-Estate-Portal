using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.CompanyApplication.CompanyDtos;
using Application.Core;
using Application.ListingApplication.ListingDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CompanyApplication
{
    public class ListEmployees
    {
        public class Query : IRequest<Result<List<KeyContact>>> 
        { 
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<KeyContact>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<KeyContact>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var employees = await _context.KeyPersons
                    .Where(x => x.Listing.CompanyId == request.CompanyId)
                    .OrderByDescending(x => x.Employee.AddedOn)
                    .ProjectTo<KeyContact>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<KeyContact>>.Success(employees);
            }
        }
    }
}