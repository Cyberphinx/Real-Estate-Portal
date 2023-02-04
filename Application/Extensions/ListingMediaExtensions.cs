using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ListingApplication.ListingDtos;
using Domain.ListingAggregate.Objects;

namespace Application.Extensions
{
    public static class ListingMediaExtensions
    {
        public static ListingMediaDto MapListingMediaToDto(this ListingMedia listingMedia)
        {
            return new ListingMediaDto
            {
                Id = listingMedia.Id,
                Index = listingMedia.Index,
                Url = listingMedia.Url,
                Type = listingMedia.Type,
                Caption = listingMedia.Caption,
                IsMain = listingMedia.IsMain,
                ListingId = listingMedia.ListingId,
            };
        }
    }
}