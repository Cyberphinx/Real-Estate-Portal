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
    public class ExpressInterest
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                // get the job and check if it exists
                var job = await _context.Jobs
                    .Include(a => a.Networks)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (job == null) return null;

                // get current user and check if it exists
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null) return null;

                // get the current job applicant
                var networker = job.Networks.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
                
                // if current job applicant has not applied for the job, then add it to the job
                if (networker == null)
                {
                    networker = new JobNetwork
                    {
                        AppUser = user,
                        Job = job,
                        Role = JobNetworkRole.InterestedCompany
                    };

                    job.Networks.Add(networker);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem applying for job");
            }
        }
    }
}