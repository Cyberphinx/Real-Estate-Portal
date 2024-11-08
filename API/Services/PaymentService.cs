using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate.Objects;
using Domain.JobAggregate.Objects;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        // get a payment intent from stripe for a AppUser invoice
        public async Task<PaymentIntent> CreateOrUpdateUserPaymentIntent(AppUserInvoice invoice)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var total = invoice.Amount;
            
            if (string.IsNullOrEmpty(invoice.PaymentIntentId))
            {
                // if we do not have a payment intent id in the Invoice
                var options = new PaymentIntentCreateOptions
                {
                    Amount = total,
                    Currency = "gbp",
                    PaymentMethodTypes = new List<string> {"card"}
                };

                // create a new payment intent
                intent = await service.CreateAsync(options);

                // below logic have been moved to API's controllers
                // invoice.PaymentIntentId = intent.Id;
                // invoice.ClientSecret = intent.ClientSecret;
            }
            else
            {
                // to update an already existing payment intent
                var options = new PaymentIntentUpdateOptions
                {
                    // only update the amount of the invoice
                    Amount = total,
                };
                await service.UpdateAsync(invoice.PaymentIntentId, options);
            }

            return intent;
        }

        // get a payment intent from stripe for a Job invoice
        public async Task<PaymentIntent> CreateOrUpdateJobPaymentIntent(JobInvoice invoice)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var total = invoice.Amount;
            
            if (string.IsNullOrEmpty(invoice.PaymentIntentId))
            {
                // if we do not have a payment intent id in the Invoice
                var options = new PaymentIntentCreateOptions
                {
                    Amount = total,
                    Currency = "gbp",
                    PaymentMethodTypes = new List<string> {"card"}
                };

                // create a new payment intent
                intent = await service.CreateAsync(options);

                // below logic have been moved to API's controllers
                // invoice.PaymentIntentId = intent.Id;
                // invoice.ClientSecret = intent.ClientSecret;
            }
            else
            {
                // to update an already existing payment intent
                var options = new PaymentIntentUpdateOptions
                {
                    // only update the amount of the invoice
                    Amount = total,
                };
                await service.UpdateAsync(invoice.PaymentIntentId, options);
            }

            return intent;
        }
    }
}

