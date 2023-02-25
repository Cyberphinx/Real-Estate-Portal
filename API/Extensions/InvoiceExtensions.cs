using System;
using System.Linq;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using Application.ProfileApplication.ProfileDtos;
using Domain.AppUserAggregate.Objects;
using Domain.Enums;
using Domain.JobAggregate.Objects;

namespace API.Extensions
{
    public static class InvoiceExtensions
    {
        // DTO mapping for AppUser Invoice 
        public static UserInvoiceDto MapUserInvoiceToDto(this AppUserInvoice invoice)
        {
            return new UserInvoiceDto
            {
                Id = invoice.Id,
                PaymentIntentId = invoice.PaymentIntentId,
                ClientSecret = invoice.ClientSecret,
                Amount = invoice.Amount,
                Description = invoice.Description,
                InvoiceDate = invoice.InvoiceDate,
                Index = invoice.Index,
                IsQuotation = invoice.IsQuotation,
                PaymentStatus = invoice.PaymentStatus,
                Title = invoice.Title,
                VatPercentage = invoice.VatPercentage,
                Items = invoice.Items.Select(item => new UserInvoiceItemDto
                {
                    Id = item.Id,
                    Amount = item.Amount,
                    Description = item.Description,
                    Title = item.Title,
                    Index = item.Index,
                    VatPercentage = item.VatPercentage
                }).ToList()
            };
        }

        // DTO mapping for Job Invoice 
        public static JobInvoiceDto MapJobInvoiceToDto(this JobInvoice invoice)
        {
            return new JobInvoiceDto
            {
                Id = invoice.Id,
                Amount = invoice.Amount,
                Currency = invoice.Currency,
                Description = invoice.Description,
                InvoiceDate = invoice.InvoiceDate,
                Index = invoice.Index,
                IsQuotation = invoice.IsQuotation,
                Items = invoice.Items.Select(item => new JobInvoiceItemDto
                {
                    Id = item.Id,
                    Amount = item.Amount,
                    Currency = item.Currency,
                    Description = item.Description,
                    Title = item.Title,
                    Index = item.Index,
                    VatPercentage = item.VatPercentage,
                    JobInvoiceId = item.JobInvoiceId
                }).ToList(),
                PaymentStatus = invoice.PaymentStatus,
                Title = invoice.Title,
                VatPercentage = invoice.VatPercentage,
                PaymentIntentId = invoice.PaymentIntentId,
                ClientSecret = invoice.ClientSecret,
                JobId = invoice.JobId,
                SellerUsername = invoice.SellerUsername
            };
        }
    }
}