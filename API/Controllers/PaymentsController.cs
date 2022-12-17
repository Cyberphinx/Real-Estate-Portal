using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Domain.AppUserAggregate;
using Domain.InvoiceAggregate;
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
        public PaymentsController(PaymentService paymentService, DataContext context, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _paymentService = paymentService;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Invoice>> CreateOrUpdatePaymentIntent()
        {
            // var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var user = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.Name));

            var currentInvoice = await _context.Invoices
                .Where(b => b.Username == user.UserName)
                .FirstOrDefaultAsync();

            if (currentInvoice == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(currentInvoice);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            currentInvoice.PaymentIntentId = currentInvoice.PaymentIntentId ?? intent.Id;
            currentInvoice.ClientSecret = currentInvoice.ClientSecret ?? intent.ClientSecret;

            _context.Update(currentInvoice);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

            return currentInvoice;
        }
    }
}