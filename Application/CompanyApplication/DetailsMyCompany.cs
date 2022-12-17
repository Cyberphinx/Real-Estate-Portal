using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.CompanyAggregate;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CompanyApplication
{
    public class DetailsMyCompany
    {
        public class Query : IRequest<Result<CompanyDto>>
        {
            // public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompanyDto>>
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

            public async Task<Result<CompanyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies
                    .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Username == _userAccessor.GetUsername());

                if (company == null)
                {
                    company = new CompanyDto
                    {
                        LegalName = "",
                        Username = _userAccessor.GetUsername(),
                        AccessStatus = AccessStatus.Private,
                        CompanyContacts = new CompanyContacts
                        {
                            Email = "",
                            Phone = ""
                        }
                    };
                }

                return Result<CompanyDto>.Success(company);
            }
        }
    }
}