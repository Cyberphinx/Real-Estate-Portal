using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.AppUserAggregate;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.AccountApplication
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.Username);

                if (user == null) return null;
                
                IdentityResult result = await _userManager.DeleteAsync(user);

                if (result != IdentityResult.Success) return Result<Unit>.Failure("Failed to delete user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}