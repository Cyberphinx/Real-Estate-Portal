using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Extensions;
using API.Services;
using Application.ProfileApplication.ProfileDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly PaymentService _paymentService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public PaymentsController(PaymentService paymentService, DataContext context, UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _paymentService = paymentService;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<InvoiceDto>> CreateOrUpdatePaymentIntent()
        {
            // find the invoice by username
            var invoice = await _context.Invoices
                .Where(i => i.Username == User.Identity.Name)
                .FirstOrDefaultAsync();

            if (invoice == null) return NotFound();

            // create payment intent
            var intent = await _paymentService.CreateOrUpdatePaymentIntent(invoice);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
            invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

            _context.Update(invoice);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

            return invoice.MapInvoiceToDto();
        }
    }
}