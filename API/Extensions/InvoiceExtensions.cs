using System;
using System.Linq;
using Application.ProfileApplication.ProfileDtos;
using Domain.AppUserAggregate.Objects;
using Domain.InvoiceAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class InvoiceExtensions
    {
        public static InvoiceDto MapInvoiceToDto(this Invoice invoice)
        {
            return new InvoiceDto
            {
                Id = invoice.Id,
                Username = invoice.Username,
                PaymentIntentId = invoice.PaymentIntentId,
                ClientSecret = invoice.ClientSecret,
                Amount = invoice.Amount,
                Description = invoice.Description,
                InvoiceDate = invoice.InvoiceDate,
                InvoiceNumber = invoice.InvoiceNumber,
                PaymentStatus = invoice.PaymentStatus,
                Title = invoice.Title,
                VatPercentage = invoice.VatPercentage,
                Items = invoice.Items.Select(item => new InvoiceItemDto
                {
                    Id = item.Id,
                    Amount = item.Amount,
                    Description = item.Description,
                    Title = item.Title,
                    VatPercentage = item.VatPercentage
                }).ToList()
            };
        }

        public static IQueryable<Invoice> RetrieveInvoiceWithItems(this IQueryable<Invoice> query, string buyerUsername)
        {
            return query.Include(i => i.Items).Where(b => b.Username == buyerUsername);
        }
    }
}