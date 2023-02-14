using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.EmployeeApplication.EmployeeDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.EmployeeApplication
{
    public class List
    {
        public class Query : IRequest<Result<List<EmployeeDto>>> { }

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
                var employees = await _context.Employees
                    .OrderByDescending(x => x.AddedOn)
                    .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
                    .AsSplitQuery()
                    .ToListAsync();

                return Result<List<EmployeeDto>>.Success(employees);
            }
        }
    }
}