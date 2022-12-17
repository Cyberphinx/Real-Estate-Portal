using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using Domain.ListingAggregate.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ListingApplication
{
    public class GetMaxValues
    {
        public class Query : IRequest<Result<List<MaxValue>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MaxValue>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<MaxValue>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (!_context.Listings.Any())
                {
                    return null;
                }
                else
                {
                    double maxPriceForSale = await _context.Listings
                    .Where(a => a.AccessStatus == AccessStatus.Public)
                    .Where(t => t.Pricing.TransactionType == TransactionType.Sale)
                    .MaxAsync(p => p.Pricing.Price);

                    int maxBedroomsForSale = await _context.Listings
                        .Where(a => a.AccessStatus == AccessStatus.Public)
                        .Where(t => t.Pricing.TransactionType == TransactionType.Sale)
                        .MaxAsync(p => p.TotalBedrooms);

                    double maxPriceForRent = await _context.Listings
                        .Where(a => a.AccessStatus == AccessStatus.Public)
                        .Where(t => t.Pricing.TransactionType == TransactionType.Rent)
                        .MaxAsync(p => p.Pricing.Price);

                    int maxBedroomsForRent = await _context.Listings
                        .Where(a => a.AccessStatus == AccessStatus.Public)
                        .Where(t => t.Pricing.TransactionType == TransactionType.Rent)
                        .MaxAsync(p => p.TotalBedrooms);

                    int maxPriceForSaleInt = (int)Math.Ceiling(maxPriceForSale);
                    int maxPriceForRentInt = (int)Math.Ceiling(maxPriceForRent);

                    var results = new List<MaxValue>();
                    results.Add(new MaxValue() { Name = "Maximum price for sale", Value = maxPriceForSaleInt });
                    results.Add(new MaxValue() { Name = "Maximum number of bedrooms for sale", Value = maxBedroomsForSale });
                    results.Add(new MaxValue() { Name = "Maximum price for rent", Value = maxPriceForRentInt });
                    results.Add(new MaxValue() { Name = "Maximum number of bedrooms for rent", Value = maxBedroomsForRent });

                    return Result<List<MaxValue>>.Success(results);
                }

            }
        }
    }
}