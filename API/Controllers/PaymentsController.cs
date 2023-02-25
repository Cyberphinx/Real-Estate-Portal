using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Services;
using Application.ProfileApplication.ProfileDtos;
using AutoMapper;
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

        // [Authorize]
        // [HttpPost]
        // public async Task<ActionResult<UserInvoiceDto>> CreateOrUpdateUserPaymentIntent()
        // {
        //     // find the invoice by username
        //     var invoice = await _context.UserInvoices
        //         .Where(i => i.Username == User.Identity.Name)
        //         .FirstOrDefaultAsync();

        //     if (invoice == null) return NotFound();

        //     // create payment intent
        //     var intent = await _paymentService.CreateOrUpdatePaymentIntent(invoice);

        //     if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

        //     invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
        //     invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

        //     _context.Update(invoice);

        //     var result = await _context.SaveChangesAsync() > 0;

        //     if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

        //     return invoice.MapInvoiceToDto();
        // }

        // [Authorize]
        // [HttpPost]
        // public async Task<ActionResult<JobInvoiceDto>> CreateOrUpdateJobPaymentIntent()
        // {
        //     // find the invoice by username
        //     var invoice = await _context.JobInvoices
        //         .Where(i => i.Username == User.Identity.Name)
        //         .FirstOrDefaultAsync();

        //     if (invoice == null) return NotFound();

        //     // create payment intent
        //     var intent = await _paymentService.CreateOrUpdatePaymentIntent(invoice);

        //     if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

        //     invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
        //     invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

        //     _context.Update(invoice);

        //     var result = await _context.SaveChangesAsync() > 0;

        //     if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

        //     return invoice.MapInvoiceToDto();
        // }

        [AllowAnonymous]
        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                _config["StripeSettings:WhSecret"]);

            var charge = (Charge)stripeEvent.Data.Object;

            var invoice = await _context.UserInvoices.FirstOrDefaultAsync(x =>
                x.PaymentIntentId == charge.PaymentIntentId);

            // var user = await _userManager.Users.Include(m => m.Membership).FirstOrDefaultAsync(x => x.UserName == invoice.Username);

            // var companies = await _context.Companies.Where(x => x.Username == invoice.Username).ToListAsync();

            if (charge.Status == "succeeded")
            {
                invoice.PaymentStatus = PaymentStatus.Paid;
                // user.Membership.IsActive = true;
                // foreach (var company in companies)
                // {
                //     company.AccessStatus = AccessStatus.Public;
                // }
            };

            await _context.SaveChangesAsync();
            // await _userManager.UpdateAsync(user);

            return new EmptyResult();
        }
        
    }
}