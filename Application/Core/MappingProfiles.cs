using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Application.ListingApplication;
using Application.OrderApplication;
using AutoMapper;
using Domain;
using Domain.InvoiceAggregate;
using Domain.CompanyAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Objects;
using Domain.LocationAggregate;
using Domain.OrderAggregate;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Listing, Listing>();
            CreateMap<Company, Company>();
            CreateMap<Order, Order>();

            CreateMap<Listing, ListingDto>()
                .ForMember(x => x.Company, o => o.MapFrom(s => s.Company))
                .ForMember(x => x.Contents, o => o.MapFrom(s => s.Contents))
                .ForMember(x => x.DetailedDescriptions, o => o.MapFrom(s => s.DetailedDescriptions));

            CreateMap<DetailedDescription, DetailedDescriptionDto>()
                .ForMember(x => x.Dimensions, o => o.MapFrom(s => s.Dimensions));
            
            CreateMap<Dimensions, DimensionsDto>()
                .ForMember(x => x.Area, o => o.MapFrom(s => s.GetArea()));

            CreateMap<Company, Owner>()
                .ForMember(x => x.CompanyReference, o => o.MapFrom(s => s.CompanyReference))
                .ForMember(x => x.CompanyName, o => o.MapFrom(s => s.CompanyName))
                .ForMember(x => x.CompanyAddress, o => o.MapFrom(s => s.CompanyAddress))
                .ForMember(x => x.RedressScheme, o => o.MapFrom(s => s.RedressScheme));

            CreateMap<Company, CompanyDto>()
                .ForMember(x => x.Orders, o => o.MapFrom(s => s.Orders));

            CreateMap<Company, Seller>();

            CreateMap<Order, OrderDto>()
                .ForMember(x => x.Invoices, o => o.MapFrom(s => s.Invoices))
                .ForMember(x => x.Company, o => o.MapFrom(s => s.Company));

            CreateMap<Invoice, InvoiceDto>()
                .ForMember(x => x.Total, o => o.MapFrom(s => s.Total))
                .ForMember(x => x.Items, o => o.MapFrom(s => s.Items))
                .ForMember(x => x.PaymentStatus, o => o.MapFrom(s => s.PaymentStatus));

            CreateMap<InvoiceItem, InvoiceItemDto>()
                .ForMember(x => x.Total, o => o.MapFrom(s => s.Total))
                .ForMember(x => x.Description, o => o.MapFrom(s => s.Description));

        }
    }
}