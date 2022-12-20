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
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.ProfileApplication
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDtos.Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDtos.Profile>>
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

            public async Task<Result<ProfileDtos.Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user =  await _context.Users
                    .ProjectTo<ProfileDtos.Profile>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                    .SingleOrDefaultAsync(x => x.Username == request.Username);
                
                if (user == null) return null;

                return Result<ProfileDtos.Profile>.Success(user);
            }
        }
    }
}