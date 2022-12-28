using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.ListingApplication;
using Application.InvoiceApplication;
using AutoMapper;
using Domain;
using Domain.AppUserAggregate;
using Domain.InvoiceAggregate;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Objects;
using Domain.LocationAggregate;
using Application.JobApplication;
using Domain.JobAggregate;
using Domain.CompanyAggregate.Objects;
using Domain.JobAggregate.Objects;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication.JobDtos;
using Application.ListingApplication.ListingDtos;
using Domain.AppUserAggregate.Objects;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // AppUser Dtos
            CreateMap<AppUser, Application.ProfileApplication.ProfileDtos.Profile>()
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.AddedOn))
                .ForMember(x => x.Language, o => o.MapFrom(s => s.Language))
                .ForMember(x => x.Country, o => o.MapFrom(s => s.Country))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(x => x.Photos, o => o.MapFrom(s => s.Photos))
                .ForMember(x => x.Reviews, o => o.MapFrom(s => s.Reviews))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.UserName));

            CreateMap<Photo, Application.ProfileApplication.ProfileDtos.PhotoDto>();
            CreateMap<AppUserReview, Application.ProfileApplication.ProfileDtos.AppUserReviewDto>();

            CreateMap<JobNetwork, Application.ProfileApplication.ProfileDtos.UserJobDto>()
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.Job.AddedOn))
                .ForMember(x => x.Id, o => o.MapFrom(s => s.JobId))
                .ForMember(x => x.JobLifeCycle, o => o.MapFrom(s => s.Job.JobLifeCycle))
                .ForMember(x => x.ServiceCategories, o => o.MapFrom(s => s.Job.ServiceCategories))
                .ForMember(x => x.Role, o => o.MapFrom(s => s.Role))
                .ForMember(x => x.Title, o => o.MapFrom(s => s.Job.Title));

            // Listing Dtos
            CreateMap<Listing, Listing>();
            CreateMap<Listing, Stock>()
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Contents.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.ListingLocation, o => o.MapFrom(s => s.ListingLocation))
                .ForMember(x => x.Pricing, o => o.MapFrom(s => s.Pricing))
                .ForMember(x => x.Agency, o => o.MapFrom(s => s.Company.DisplayName));

            CreateMap<Content, ContentDto>();
            CreateMap<DetailedDescription, DetailedDescriptionDto>()
            .ForMember(x => x.Area, o => o.MapFrom(s => s.Length * s.Width));
            CreateMap<EpcRatings, EpcRatingsDto>();
            CreateMap<ListingLocation, ListingLocationDto>();
            CreateMap<Pricing, PricingDto>();
            CreateMap<ServiceCharge, ServiceChargeDto>();

            CreateMap<ListingWatcher, WatcherDto>()
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description));
            
            CreateMap<ListingWatcher, Application.ProfileApplication.ProfileDtos.WatcherListingDto>()
                .ForMember(x => x.Id, o => o.MapFrom(s => s.Listing.Id))
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.Listing.AddedOn))
                .ForMember(x => x.Reference, o => o.MapFrom(s => s.Listing.ListingReference))
                .ForMember(x => x.TransactionType, o => o.MapFrom(s => s.Listing.Pricing.TransactionType))
                .ForMember(x => x.Price, o => o.MapFrom(s => s.Listing.Pricing.Price))
                .ForMember(x => x.PriceQualifier, o => o.MapFrom(s => s.Listing.Pricing.PriceQualifier))
                .ForMember(x => x.Currency, o => o.MapFrom(s => s.Listing.Pricing.Currency))
                .ForMember(x => x.RentFrequency, o => o.MapFrom(s => s.Listing.Pricing.RentFrequency))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Listing.Contents.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.City, o => o.MapFrom(s => s.Listing.ListingLocation.TownOrCity))
                .ForMember(x => x.Postcode, o => o.MapFrom(s => s.Listing.ListingLocation.PostalCode));

            CreateMap<Listing, ListingDto>()
                .ForMember(x => x.Company, o => o.MapFrom(s => s.Company))
                .ForMember(x => x.Contents, o => o.MapFrom(s => s.Contents))
                .ForMember(x => x.DetailedDescriptions, o => o.MapFrom(s => s.DetailedDescriptions))
                .ForMember(x => x.Wacthers, o => o.MapFrom(s => s.Watchers));

            // Company Dtos
            CreateMap<Company, Company>();
            CreateMap<Company, Owner>()
                .ForMember(x => x.Logo, o => o.MapFrom(s => s.CompanyContents.FirstOrDefault(x => x.IsLogo).Url));
            
            CreateMap<CompanyAddress, CompanyAddressDto>();
            CreateMap<CompanyContacts, CompanyContactsDto>();
            CreateMap<CompanyContent, CompanyContentDto>();
            CreateMap<CompanyDescription, CompanyDescriptionDto>();
            CreateMap<Insurance, InsuranceDto>();
            CreateMap<Membership, MembershipDto>();
            CreateMap<CompanyReview, CompanyReviewDto>();

            CreateMap<Company, CompanyDto>()
                .ForMember(x => x.CompanyAddress, o => o.MapFrom(s => s.CompanyAddress))
                .ForMember(x => x.CompanyContacts, o => o.MapFrom(s => s.CompanyContacts))
                .ForMember(x => x.CompanyContents, o => o.MapFrom(s => s.CompanyContents))
                .ForMember(x => x.CompanyDescriptions, o => o.MapFrom(s => s.CompanyDescriptions))
                .ForMember(x => x.Insurances, o => o.MapFrom(s => s.Insurances))
                .ForMember(x => x.Membership, o => o.MapFrom(s => s.Membership))
                .ForMember(x => x.Reviews, o => o.MapFrom(s => s.Reviews))
                .ForMember(x => x.Listings, o => o.MapFrom(s => s.Listings));
            
            CreateMap<Company, UserCompanyDto>()
                .ForMember(x => x.ListingsCount, o => o.MapFrom(s => s.Listings.Count));


            
            // Job Dtos
            CreateMap<JobContent, JobContentDto>();
            CreateMap<JobLocation, JobLocationDto>();
            CreateMap<Job, JobDto>()
                .ForMember(x => x.JobContents, o => o.MapFrom(s => s.JobContents))
                .ForMember(x => x.JobLocation, o => o.MapFrom(s => s.JobLocation))
                .ForMember(x => x.Networks, o => o.MapFrom(s => s.Networks));

            CreateMap<JobNetwork, NetworkDto>()
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.JobsCount, o => o.MapFrom(s => s.AppUser.Jobs.Count))
                .ForMember(x => x.ReviewsCount, o => o.MapFrom(s => s.AppUser.Reviews.Count))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.Role, o => o.MapFrom(s => s.Role));



            // Invoice Dtos
            CreateMap<Invoice, InvoiceDto>()
                .ForMember(x => x.Amount, o => o.MapFrom(s => s.Amount))
                .ForMember(x => x.Items, o => o.MapFrom(s => s.Items))
                .ForMember(x => x.PaymentStatus, o => o.MapFrom(s => s.PaymentStatus));

            CreateMap<InvoiceItem, InvoiceItemDto>()
                .ForMember(x => x.Amount, o => o.MapFrom(s => s.Amount))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.Description));
        }
    }
}