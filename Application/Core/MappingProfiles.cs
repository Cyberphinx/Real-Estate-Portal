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

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Listing Dtos
            CreateMap<Listing, Listing>();
            CreateMap<Listing, Stock>();

            CreateMap<Listing, ListingDto>()
                .ForMember(x => x.Company, o => o.MapFrom(s => s.Company))
                .ForMember(x => x.Contents, o => o.MapFrom(s => s.Contents))
                .ForMember(x => x.DetailedDescriptions, o => o.MapFrom(s => s.DetailedDescriptions));

            CreateMap<DetailedDescription, DetailedDescriptionDto>()
                .ForMember(x => x.Dimensions, o => o.MapFrom(s => s.Dimensions));

            CreateMap<Content, ContentDto>();

            CreateMap<Dimensions, DimensionsDto>()
                .ForMember(x => x.Area, o => o.MapFrom(s => s.GetArea()));


            // Company Dtos
            CreateMap<Company, Company>();
            CreateMap<CompanyContent, CompanyContentDto>();
            CreateMap<CompanyDescription, CompanyDescriptionDto>();
            CreateMap<Insurance, InsuranceDto>();

            CreateMap<Company, Owner>();

            CreateMap<Company, CompanyDto>()
                .ForMember(x => x.CompanyContents, o => o.MapFrom(s => s.CompanyContents))
                .ForMember(x => x.CompanyDescriptions, o => o.MapFrom(s => s.CompanyDescriptions))
                .ForMember(x => x.Insurances, o => o.MapFrom(s => s.Insurances))
                .ForMember(x => x.Listings, o => o.MapFrom(s => s.Listings));
            

            // Job Dtos
            CreateMap<Job, JobDto>()
                .ForMember(x => x.Networks, o => o.MapFrom(s => s.Networks));

            CreateMap<JobNetwork, NetworkDto>()
                .ForMember(x => x.Description, o => o.MapFrom(s => s.AppUser.Description))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.Invoice, o => o.MapFrom(s => s.Invoice))
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