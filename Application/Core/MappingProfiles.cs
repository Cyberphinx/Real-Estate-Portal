using System.Linq;
using Application.CompanyApplication;
using AutoMapper;
using Domain;
using Domain.AppUserAggregate;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Objects;
using Domain.JobAggregate;
using Domain.CompanyAggregate.Objects;
using Domain.JobAggregate.Objects;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using Application.ListingApplication.ListingDtos;
using Domain.AppUserAggregate.Objects;
using Application.MessageApplication;
using System;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Profile Dtos
            CreateMap<AppUser, Application.ProfileApplication.ProfileDtos.Profile>()
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.AddedOn))
                .ForMember(x => x.Language, o => o.MapFrom(s => s.Language))
                .ForMember(x => x.Country, o => o.MapFrom(s => s.Country))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(x => x.Photos, o => o.MapFrom(s => s.Photos.OrderBy(x => x.Index)))
                .ForMember(x => x.Reviews, o => o.MapFrom(s => s.Reviews))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(x => x.Membership, o => o.MapFrom(s => s.Membership));

            CreateMap<AppUserMedia, Application.ProfileApplication.ProfileDtos.PhotoDto>();
            CreateMap<AppUserReview, Application.ProfileApplication.ProfileDtos.AppUserReviewDto>();

            CreateMap<JobNetwork, Application.ProfileApplication.ProfileDtos.UserJobDto>()
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.Job.AddedOn))
                .ForMember(x => x.Id, o => o.MapFrom(s => s.JobId))
                .ForMember(x => x.JobLifeCycle, o => o.MapFrom(s => s.Job.JobLifeCycle))
                .ForMember(x => x.JobReference, o => o.MapFrom(s => s.Job.JobReference))
                .ForMember(x => x.ServiceCategories, o => o.MapFrom(s => s.Job.ServiceCategories))
                .ForMember(x => x.Role, o => o.MapFrom(s => s.Role))
                .ForMember(x => x.Title, o => o.MapFrom(s => s.Job.Title));

            // Listing Dtos
            // this is for editing the listing (map from payload to database entity)
            CreateMap<Listing, Listing>() 
                .ForMember(x => x.ListingMedia, o => o.MapFrom(s => s.ListingMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.KeyContacts, o => o.MapFrom(s => s.KeyContacts.OrderBy(x => x.Name)))
                .ForMember(x => x.ChangeLogs, o => o.MapFrom(s => s.ChangeLogs.OrderByDescending(x => x.LastModified)))
                .ForMember(x => x.DetailedDescriptions, o => o.MapFrom(s => s.DetailedDescriptions.OrderBy(x => x.Index)))
                .ForMember(x => x.Watchers, o => o.MapFrom(s => s.Watchers.OrderBy(x => x.AddedOn)));

            CreateMap<Listing, ListingDto>()
                .ForMember(x => x.Company, o => o.MapFrom(s => s.Company))
                .ForMember(x => x.ListingMedia, o => o.MapFrom(s => s.ListingMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.DetailedDescriptions, o => o.MapFrom(s => s.DetailedDescriptions.OrderBy(x => x.Index)))
                .ForMember(x => x.Wacthers, o => o.MapFrom(s => s.Watchers));

            CreateMap<Listing, ListingCompareDto>()
                .ForMember(x => x.Price, o => o.MapFrom(x => x.Pricing.Price));

            CreateMap<Listing, Stock>()
                .ForMember(x => x.Image, o => o.MapFrom(
                    s => s.ListingMedia.Any(x => x.IsMain) ? s.ListingMedia.FirstOrDefault(x => x.IsMain).Url : s.ListingMedia.First().Url
                    ))
                .ForMember(x => x.ListingLocation, o => o.MapFrom(s => s.ListingLocation))
                .ForMember(x => x.Pricing, o => o.MapFrom(s => s.Pricing))
                .ForMember(x => x.Agency, o => o.MapFrom(s => s.Company.DisplayName));

            CreateMap<ListingMedia, ListingMedia>();
            CreateMap<ListingMedia, ListingMediaDto>();

            CreateMap<DetailedDescription, DetailedDescription>();
            CreateMap<DetailedDescription, DetailedDescriptionDto>()
                .ForMember(x => x.Area, o => o.MapFrom(s => s.Length * s.Width));
            
            CreateMap<ListingLocation, ListingLocation>();
            CreateMap<ListingLocation, ListingLocationDto>();

            CreateMap<Pricing, Pricing>();
            CreateMap<Pricing, PricingDto>();

            CreateMap<ServiceCharge, ServiceCharge>();
            CreateMap<ServiceCharge, ServiceChargeDto>();

            CreateMap<ChangeLog, ChangeLog>();
            CreateMap<ChangeLog, ChangeLogDto>();

            CreateMap<KeyContact, KeyContact>();
            CreateMap<KeyContact, KeyContactDto>();

            CreateMap<ListingWatcher, ListingWatcher>();
            CreateMap<ListingWatcher, WatcherDto>()
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description))
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.AddedOn));

            CreateMap<ListingWatcher, Application.ProfileApplication.ProfileDtos.WatcherListingDto>()
                .ForMember(x => x.Id, o => o.MapFrom(s => s.Listing.Id))
                .ForMember(x => x.AddedOn, o => o.MapFrom(s => s.Listing.AddedOn))
                .ForMember(x => x.Reference, o => o.MapFrom(s => s.Listing.ListingReference))
                .ForMember(x => x.TransactionType, o => o.MapFrom(s => s.Listing.Pricing.TransactionType))
                .ForMember(x => x.Price, o => o.MapFrom(s => s.Listing.Pricing.Price))
                .ForMember(x => x.PriceQualifier, o => o.MapFrom(s => s.Listing.Pricing.PriceQualifier))
                .ForMember(x => x.Currency, o => o.MapFrom(s => s.Listing.Pricing.Currency))
                .ForMember(x => x.RentFrequency, o => o.MapFrom(s => s.Listing.Pricing.RentFrequency))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Listing.ListingMedia.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.LifeCycleStatus, o => o.MapFrom(s => s.Listing.LifeCycleStatus))
                .ForMember(x => x.City, o => o.MapFrom(s => s.Listing.ListingLocation.TownOrCity))
                .ForMember(x => x.Postcode, o => o.MapFrom(s => s.Listing.ListingLocation.PostalCode));

            // Company Dtos
            CreateMap<Company, Company>();  // this is for editing the listing (map from payload to database entity)
            CreateMap<Company, CompanyMinimalDto>();  // this is for editing the listing (map from payload to database entity)
            CreateMap<CompanyMedia, CompanyMediaDto>();
            CreateMap<Company, Owner>()
                .ForMember(x => x.Logo, o => o.MapFrom(s => s.CompanyMedia.FirstOrDefault(x => x.IsLogo).Url));

            CreateMap<CompanyAddress, CompanyAddressDto>();
            CreateMap<CompanyContacts, CompanyContactsDto>();
            CreateMap<CompanyDescription, CompanyDescriptionDto>();
            CreateMap<Insurance, InsuranceDto>();
            CreateMap<Membership, ProfileApplication.ProfileDtos.MembershipDto>();
            CreateMap<CompanyReview, CompanyReviewDto>();

            CreateMap<Company, CompanyDto>()
                .ForMember(x => x.CompanyAddress, o => o.MapFrom(s => s.CompanyAddress))
                .ForMember(x => x.CompanyContacts, o => o.MapFrom(s => s.CompanyContacts))
                .ForMember(x => x.CompanyMedia, o => o.MapFrom(s => s.CompanyMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.CompanyDescriptions, o => o.MapFrom(s => s.CompanyDescriptions.OrderBy(x => x.Index)))
                .ForMember(x => x.Insurances, o => o.MapFrom(s => s.Insurances.OrderBy(x => x.Index)))
                .ForMember(x => x.Reviews, o => o.MapFrom(s => s.Reviews))
                .ForMember(x => x.ListingsCount, o => o.MapFrom(s => s.Listings.Count()));

            CreateMap<Company, UserCompanyDto>()
                .ForMember(x => x.ListingsCount, o => o.MapFrom(s => s.Listings.Count))
                .ForMember(x => x.Insurances, o => o.MapFrom(s => s.Insurances.OrderBy(x => x.Index)));


            // Job Dtos
            CreateMap<JobMedia, JobMediaDto>();

            CreateMap<JobLocation, JobLocationDto>();
            CreateMap<JobLocation, JobLocationPublicDto>();

            CreateMap<Job, JobCalendar>();

            CreateMap<Job, JobPublicDto>()
                .ForMember(x => x.JobMedia, o => o.MapFrom(s => s.JobMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.JobLocations, o => o.MapFrom(s => s.JobLocations.OrderBy(x => x.Index)))
                .ForMember(x => x.Networks, o => o.MapFrom(s => s.Networks));

            CreateMap<Job, JobDto>()
                .ForMember(x => x.JobMedia, o => o.MapFrom(s => s.JobMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.JobLocations, o => o.MapFrom(s => s.JobLocations.OrderBy(x => x.Index)))
                .ForMember(x => x.Networks, o => o.MapFrom(s => s.Networks))
                .ForMember(x => x.Messages, o => o.MapFrom(s => s.Messages));

            CreateMap<Job, JobRemovalsDto>()
                .ForMember(x => x.JobMedia, o => o.MapFrom(s => s.JobMedia.OrderBy(x => x.Index)))
                .ForMember(x => x.JobLocations, o => o.MapFrom(s => s.JobLocations.OrderBy(x => x.Index)))
                .ForMember(x => x.Invoices, o => o.MapFrom(s => s.Invoices.OrderBy(x => x.Index)))
                .ForMember(x => x.InvoicesCount, o => o.MapFrom(s => s.Invoices.Count()))
                .ForMember(x => x.Networks, o => o.MapFrom(s => s.Networks))
                .ForMember(x => x.Messages, o => o.MapFrom(s => s.Messages));

            CreateMap<JobNetwork, NetworkPublicDto>()
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.JobsCount, o => o.MapFrom(s => s.AppUser.Jobs.Count))
                .ForMember(x => x.ReviewsCount, o => o.MapFrom(s => s.AppUser.Reviews.Count))
                .ForMember(x => x.Role, o => o.MapFrom(s => s.Role));

            CreateMap<JobNetwork, NetworkDto>()
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.JobsCount, o => o.MapFrom(s => s.AppUser.Jobs.Count))
                .ForMember(x => x.ReviewsCount, o => o.MapFrom(s => s.AppUser.Reviews.Count))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.Role, o => o.MapFrom(s => s.Role))
                .ForMember(x => x.Phone, o => o.MapFrom(s => s.AppUser.PhoneNumber))
                .ForMember(x => x.Email, o => o.MapFrom(s => s.AppUser.Email));

            CreateMap<JobMessage, JobMessageDto>()
                .ForMember(x => x.Author, o => o.MapFrom(s => s.Author.UserName));


            // Invoice Dtos
            CreateMap<AppUserInvoice, ProfileApplication.ProfileDtos.UserInvoiceDto>()
                .ForMember(x => x.Amount, o => o.MapFrom(s => s.Amount))
                .ForMember(x => x.Items, o => o.MapFrom(s => s.Items))
                .ForMember(x => x.IsQuotation, o => o.MapFrom(s => s.IsQuotation))
                .ForMember(x => x.PaymentStatus, o => o.MapFrom(s => s.PaymentStatus));

            CreateMap<AppUserInvoiceItem, ProfileApplication.ProfileDtos.UserInvoiceItemDto>();

            CreateMap<JobInvoice, JobInvoiceDto>()
                .ForMember(x => x.Amount, o => o.MapFrom(s => s.Amount))
                .ForMember(x => x.Items, o => o.MapFrom(s => s.Items))
                .ForMember(x => x.IsQuotation, o => o.MapFrom(s => s.IsQuotation))
                .ForMember(x => x.PaymentStatus, o => o.MapFrom(s => s.PaymentStatus));

            CreateMap<JobInvoiceItem, JobInvoiceItemDto>();


            // Message Dtos
            CreateMap<JobMessage, MessageDto>()
                .ForMember(x => x.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

        }
    }
}