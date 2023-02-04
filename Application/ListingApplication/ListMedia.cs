// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading;
// using System.Threading.Tasks;
// using Application.Core;
// using Application.JobApplication.JobDtos;
// using Application.ListingApplication.ListingDtos;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using Domain;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

// namespace Application.ListingApplication
// {
//     public class ListMedia
//     {
//         public class Query : IRequest<Result<List<ListingMediaDto>>>
//         {
//             public Guid ListingId { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, Result<List<ListingMediaDto>>>
//         {
//             private readonly DataContext _context;
//             private readonly IMapper _mapper;
//             public Handler(DataContext context, IMapper mapper)
//             {
//                 _mapper = mapper;
//                 _context = context;
//             }

//             public async Task<Result<List<ListingMediaDto>>> Handle(Query request, CancellationToken cancellationToken)
//             {
//                 var media = await _context.ListingMedia
//                     .Where(x => x.ListingId == request.ListingId)
//                     .OrderByDescending(x => x.Id)
//                     .ProjectTo<ListingMediaDto>(_mapper.ConfigurationProvider) //Automapper projection mapping is much better than .include in terms of SQL query efficiency
//                     .AsSplitQuery()
//                     .ToListAsync();

//                 return Result<List<ListingMediaDto>>.Success(media);
//             }
//         }
//     }
// }