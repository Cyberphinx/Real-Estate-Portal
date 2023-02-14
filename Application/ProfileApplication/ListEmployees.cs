using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.EmployeeApplication.EmployeeDtos;

namespace Application.ProfileApplication
{
    public class ListEmployees
    {
        public class Query : IRequest<Result<List<EmployeeDto>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<EmployeeDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<EmployeeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Employees
                    .Where(c => c.Username == request.Username)
                    .OrderByDescending(a => a.AddedOn).ThenBy(a => a.Id)
                    .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var employees = await query.ToListAsync();

                return Result<List<EmployeeDto>>.Success(employees);
            }
        }
    }
}