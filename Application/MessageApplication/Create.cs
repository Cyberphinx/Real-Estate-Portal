using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;
using AutoMapper;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain.JobAggregate.Objects;

namespace Application.MessageApplication
{
    public class Create
    {
        public class Command : IRequest<Result<MessageDto>>
        {
            public string Body { get; set; }
            public Guid JobId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<MessageDto>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<MessageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs.FindAsync(request.JobId);

                if (job == null) return null;

                var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var message = new JobMessage
                {
                    Author = user,
                    Job = job,
                    Body = request.Body
                };

                job.Messages.Add(message);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<MessageDto>.Success(_mapper.Map<MessageDto>(message));

                return Result<MessageDto>.Failure("Failed to add message");

            }
        }
    }
}