using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.JobApplication.JobDtos;
using Domain;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobApplication
{
    public class ShortlistApplicant
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string ApplicantUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // First get the job and then check if it exists
                var job = await _context.Jobs
                    .Include(a => a.Networks)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (job == null) return null;
                
                // Then get current user and then check if it exists
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null) return null;
                
                // Then check if the current user exist under the job
                var networker = job.Networks.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
                if (networker == null) return null;
                
                // Then get the cutomer of the job, which cannot be null
                var customerUsername = job.Networks.FirstOrDefault(x => x.Role == JobNetworkRole.Customer).AppUser.UserName;
                
                // Then get the job applicant from the job and then check if it exists
                var applicant = job.Networks.FirstOrDefault(x => x.AppUser.UserName == request.ApplicantUsername);
                if (applicant == null) return null;

                // Then if, 1. the current user exists, 2. the current user is the customer, 3. the job applicant exist, then we shortlist the applicant
                if (networker != null && customerUsername == user.UserName && applicant != null)
                {
                    applicant.Role = JobNetworkRole.ShortlistedCompany;
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem shotlisting applicant");
            }
        }
    }
}