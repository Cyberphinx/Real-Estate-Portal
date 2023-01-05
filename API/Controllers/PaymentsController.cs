using System;
using System.Collections.Generic;
using System.IO;
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
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly PaymentService _paymentService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public PaymentsController(PaymentService paymentService, DataContext context, UserManager<AppUser> userManager, IMapper mapper, IConfiguration config)
        {
            _config = config;
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

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            // read the request body
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            // get the thing that we are interested in
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                _config["StripeSettings:WhSecret"]);

            // cast it into a stripe charge object
            var charge = (Charge)stripeEvent.Data.Object;

            var invoice = await _context.Invoices.FirstOrDefaultAsync(x => x.PaymentIntentId == charge.PaymentIntentId);
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == invoice.Username);
            var companies = await _context.Companies.Where(x => x.Username == invoice.Username).ToListAsync();

            if (charge.Status == "succeeded") 
            {
                invoice.PaymentStatus = PaymentStatus.Paid;
                user.Membership.IsActive = true;
                foreach (var company in companies)
                {
                    company.AccessStatus = AccessStatus.Public;
                }
            };

            await _context.SaveChangesAsync();

            // let stripe know that we have received its request, otherwise they will keep trying to send the request
            return new EmptyResult();
        }
    }
}