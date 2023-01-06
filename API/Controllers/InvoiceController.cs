using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Application.InvoiceApplication;
using Application.ProfileApplication.ProfileDtos;
using Domain.AppUserAggregate.Objects;
using Domain.CompanyAggregate;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;
using Stripe;

namespace API.Controllers
{
    public class InvoiceController : BaseApiController
    
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public InvoiceController(DataContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        [HttpGet(Name = "GetInvoice")]
        public async Task<ActionResult<InvoiceDto>> GetFirstInvoice()
        {
            var invoice = await _context.Invoices
                .Include(i => i.Items)
                .Where(x => x.Username == User.Identity.Name)
                .SingleOrDefaultAsync(x => x.InvoiceNumber == 1);

            if (invoice == null) return NotFound();

            return invoice.MapInvoiceToDto();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetInvoice(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> AddInvoice(Domain.AppUserAggregate.Objects.Invoice invoice)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Invoice = invoice}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditInvoice(Guid id, Domain.AppUserAggregate.Objects.Invoice invoice)
        {
            invoice.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Invoice = invoice}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        // private async Task<Invoice> RetrieveInvoice(string appUserId)
        // {
        //     if (string.IsNullOrEmpty(appUserId))
        //     {
        //         Response.Cookies.Delete("appUserId");
        //         return null;
        //     }

        //     return await _context.Invoices
        //         .Include(i => i.Items)
        //         .FirstOrDefaultAsync(x => x.AppUserId == appUserId);
        // }

        // private string GetBuyerId()
        // {
        //     return User.Identity?.Name ?? Request.Cookies["appUserId"];
        // }

    }
}