using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.CompanyApplication.CompanyDtos;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.ProfileApplication
{
    public class DetailsMainCompany
    {
        public class Query : IRequest<Result<UserCompanyDto>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<UserCompanyDto>>
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

            public async Task<Result<UserCompanyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var company =  await _context.Companies
                    .Where(c => c.Username == request.Username)
                    .ProjectTo<UserCompanyDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(c => c.IsMain == true);
                
                if (company == null) return null;

                return Result<UserCompanyDto>.Success(company);
            }
        }
    }
}