using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.InvoiceApplication;
using Domain.AppUserAggregate.Objects;
using Domain.CompanyAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvoiceController : BaseApiController
    
    {
        [HttpGet]
        public async Task<IActionResult> GetInvoices()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetInvoice(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> AddInvoice(Invoice invoice)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Invoice = invoice}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditInvoice(Guid id, Invoice invoice)
        {
            invoice.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Invoice = invoice}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}