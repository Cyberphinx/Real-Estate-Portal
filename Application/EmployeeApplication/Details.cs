using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.EmployeeApplication.EmployeeDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.EmployeeApplication
{
    public class Details
    {
        public class Query : IRequest<Result<EmployeeDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EmployeeDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<EmployeeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var employee =  await _context.Employees
                    .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<EmployeeDto>.Success(employee);
            }
        }
    }
}