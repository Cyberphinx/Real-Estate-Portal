using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Extensions;
using API.Services;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication.JobDtos;
using Application.JobInvoiceApplication;
using Application.JobInvoiceApplication.JobInvoiceDtos;
using Application.ProfileApplication.ProfileDtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.AppUserAggregate;
using Domain.AppUserAggregate.Objects;
using Domain.CompanyAggregate;
using Domain.Enums;
using Domain.JobAggregate;
using Domain.JobAggregate.Objects;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using MimeKit;
using Persistence;
using Stripe;

namespace API.Controllers
{
    public class InvoiceController : BaseApiController

    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly PaymentService _paymentService;
        private readonly UserManager<AppUser> _userManager;
        private readonly EmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public InvoiceController(DataContext context, IConfiguration config,
        PaymentService paymentService, UserManager<AppUser> userManager,
        EmailService emailService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _emailService = emailService;
            _mapper = mapper;
            _userManager = userManager;
            _paymentService = paymentService;
            _config = config;
            _context = context;
        }

        // get the first AppUser invoice of an AppUser
        [HttpGet(Name = "GetInvoice")]
        public async Task<ActionResult<UserInvoiceDto>> GetFirstUserInvoice()
        {
            var invoice = await _context.UserInvoices
                .Include(i => i.Items)
                .Where(x => x.AppUser.UserName == User.Identity.Name)
                .SingleOrDefaultAsync(x => x.Index == 1);

            if (invoice == null) return NotFound();

            return invoice.MapUserInvoiceToDto();
        }

        // get all Job invoices associated with a Job Customer
        [HttpGet("customer")]
        public async Task<ActionResult> GetInvoicesAsCustomer()
        {
            return HandleResult(await Mediator.Send(new ListAsCustomer.Query()));
        }

        // get a single Job invoice in order to pay for it via Stripe
        [Authorize(Policy = "IsJobInvoiceCustomer")]
        [HttpGet("customer/{invoiceId}")]
        public async Task<ActionResult> GetInvoiceAsCustomer(Guid invoiceId)
        {
            return HandleResult(await Mediator.Send(new DetailsAsCustomer.Query { InvoiceId = invoiceId }));
        }

        // get a single Job invoice in order to pay for it via Stripe
        [Authorize(Policy = "IsJobInvoiceSeller")]
        [HttpGet("seller /{invoiceId}")]
        public async Task<ActionResult> GetInvoiceAsSeller(Guid invoiceId)
        {
            return HandleResult(await Mediator.Send(new DetailsAsCustomer.Query { InvoiceId = invoiceId }));
        }


        // get all Job invoices associated with a Job Provider
        [Authorize(Roles = "Admin, Agency, Company, Removalist")]
        [HttpGet("seller")]
        public async Task<ActionResult> GetInvoicesAsSeller()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        // create an email with email template
        private string CreateJobInvoiceEmail(JobInvoice invoice, Job job, CompanyDto sellerCompany, StringValues origin, string emailTemplate)
        {
            var customer = job.MapJobToCustomerContactsDto();

            // Get the path to directory Folder
            var apiRoot = _webHostEnvironment.ContentRootPath;

            // Get the email template file
            var pathToFile = apiRoot
                            + Path.DirectorySeparatorChar.ToString()
                            + "EmailTemplates"
                            + Path.DirectorySeparatorChar.ToString()
                            + emailTemplate;

            // Initialise bodybuilder
            var builder = new BodyBuilder();

            // Read Content of Template file using StreamReader and append to BodyBuilder()
            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder.HtmlBody = SourceReader.ReadToEnd();
            }

            // Passing value and Formatting the Content of Template with Dynamic Values seuqntially in numeric order
            // {0} : company display name
            // {1} : customer display name
            // {2} : invoice date
            // {3} : invoice number
            // {4} : job title / invoice title
            // {5} : job reference
            // {6} : total NET
            var totalNet = Math.Round(invoice.Amount / (1 + ((double)invoice.Items.FirstOrDefault(x => x.Index == 0).VatPercentage / 100)),0);
            // {7} : total VAT
            var totalVat = invoice.Amount - totalNet;
            // {8} : total amount due
            // {9} : payment link url on Sanctum
            var paymentUrl = $"{origin}/job/{invoice.JobId}/pay";
            // {10} : company email
            // {11} : company phone
            // {12} : company address
            // {13} : company name
            // {14} : company number
            // {15} : VAT number
            // {16} : cutomer email
            // {17} : customer phone
            string messageBody = string.Format(builder.HtmlBody,
                        // String.Format("{0:dddd, d MMMM yyyy}", DateTime.Now),
                        sellerCompany.DisplayName,
                        customer.CustomerName,
                        invoice.InvoiceDate,
                        invoice.Index,
                        invoice.Title,
                        job.JobReference,
                        totalNet,
                        totalVat,
                        invoice.Amount,
                        paymentUrl,
                        sellerCompany.CompanyContacts.Email,
                        sellerCompany.CompanyContacts.Phone,
                        sellerCompany.CompanyAddress.DisplayAddress,
                        sellerCompany.LegalName,
                        sellerCompany.CompanyRegistrationNumber,
                        sellerCompany.VatNumber,
                        customer.CustomerEmail,
                        customer.CustomerPhone
                        );

            return messageBody;
        }

        // create an invoice or a quotation by the seller
        [Authorize(Roles = "Admin, Agency, Company, Removalist")]
        [HttpPost("job/{jobId}")]
        public async Task<IActionResult> AddJobInvoice(JobInvoice invoice)
        {
            // get seller information
            var seller = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.Name));
            if (seller == null) return Unauthorized();
            Console.WriteLine("Claim type name: " + ClaimTypes.Name);

            // get seller's main company
            var sellerCompany = await _context.Companies
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Username == seller.UserName);
            if (sellerCompany == null) return BadRequest("Cannot find the seller company");

            invoice.InvoiceDate = DateTime.UtcNow;
            invoice.SellerUsername = sellerCompany.Username;

            // finally, add the invoice to the job
            await _context.JobInvoices.AddAsync(invoice);
            // SaveChangesAsync actually returns an integer of state entries written to the database
            var result = await _context.SaveChangesAsync() > 0;
            // if no entries has been written to the database, ie. the AddAsync failed, then return BadRequest
            if (!result) return BadRequest("Problem creating invoice");
            if (result) Console.WriteLine($"Succesfully added invoice (Id: {invoice.Id}) to database JobInvoices.");

            // create a payment intent Id
            await CreateOrUpdateJobPaymentIntent(invoice);


            // BELOW IS FOR EMAIL CONFIRMATIONS
            // the header "origin" is only set by the browser during a CORS request, so it will not show up if tested under Postman, etc.
            var origin = Request.Headers["origin"];
            // var origin = "https://localhost:5000/api";

            // RETRIEVE CUSTOMER CONTACT DETAILS
            var job = await _context.Jobs.Include(x => x.Networks).ThenInclude(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == invoice.JobId);
            if (job == null) return NotFound("Cannot find the job that is associated with the invoice");

            var customer = job.MapJobToCustomerContactsDto();

            // EMAIL MESSAGE BODY
            var invoiceToCustomer = CreateJobInvoiceEmail(invoice, job, sellerCompany, origin, "InvoiceToCustomer.html");
            var invoiceToSeller = CreateJobInvoiceEmail(invoice, job, sellerCompany, origin, "InvoiceToSeller.html");

            // SendinBlue - send quotation/invoice email to customer
            var emailToCutomer = new EmailDto
            {
                RecipientName = customer.CustomerName,
                RecipientEmail = customer.CustomerEmail,
                // RecipientPhone = customer.CustomerPhone,
                Subject = invoice.IsQuotation ? "😺 You have received a quote via Sanctum" : "😺 You have received an invoice via Sanctum",
                Body = invoice.IsQuotation ? invoiceToCustomer : invoiceToCustomer,
                AccountType = Domain.AppUserAggregate.Enums.AccountType.Customer
            };
            await _emailService.SendEmailAsync(emailToCutomer);


            // SendinBlue - send quotation/invoice email to seller
            var emailToSeller = new EmailDto
            {
                RecipientName = sellerCompany.DisplayName,
                RecipientEmail = sellerCompany.CompanyContacts.Email,
                // RecipientPhone = seller.PhoneNumber,
                Subject = invoice.IsQuotation ? "😺 You have issued a quote via Sanctum" : "😺 You have issued an invoice via Sanctum",
                Body = invoice.IsQuotation ? invoiceToSeller : invoiceToSeller,
                AccountType = seller.AccountType
            };
            await _emailService.SendEmailAsync(emailToSeller);

            return Ok(invoice.IsQuotation ? "Job quotation created successfully - please check email" : "Job invoice created successfully - please check email");
        }



        // create a payment intent id for a Job invoice (eg. payment of a moving company's job booking)
        private async Task<ActionResult<JobInvoiceDto>> CreateOrUpdateJobPaymentIntent(JobInvoice invoice)
        {
            if (invoice == null) return NotFound();

            // create payment intent
            var intent = await _paymentService.CreateOrUpdateJobPaymentIntent(invoice);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
            invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

            _context.Update(invoice);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

            return invoice.MapJobInvoiceToDto();
        }

        // create a payment intent id for a AppUser invoice (eg. payment of an account sign up fee)
        private async Task<ActionResult<UserInvoiceDto>> CreateOrUpdateUserPaymentIntent(AppUserInvoice invoice)
        {
            if (invoice == null) return NotFound();

            // create payment intent
            var intent = await _paymentService.CreateOrUpdateUserPaymentIntent(invoice);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            invoice.PaymentIntentId = invoice.PaymentIntentId ?? intent.Id;
            invoice.ClientSecret = invoice.ClientSecret ?? intent.ClientSecret;

            _context.Update(invoice);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating the current invoice with intent" });

            return invoice.MapUserInvoiceToDto();
        }

        // [HttpPut("/job{id}")]
        // public async Task<IActionResult> EditJobInvoice(Guid id, JobInvoice invoice)
        // {
        //     invoice.Id = id;
        //     return HandleResult(await Mediator.Send(new Edit.Command{Invoice = invoice}));
        // }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobInvoice(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        // [AllowAnonymous]
        // [HttpGet("calculate")]
        // public string CalculationTest()
        // {
        //     var invoiceAmount = 1850;
        //     Console.WriteLine($"Invoice amount: {invoiceAmount}");
        //     var invoiceVatPercent = 20;
        //     Console.WriteLine($"Invoice VAT percentage: {invoiceVatPercent}");
        //     Console.WriteLine($"Invoice VAT percentage in doubles: {invoiceVatPercent / 100}");
        //     Console.WriteLine($"Invoice VAT percentage + 1: {1 + (invoiceVatPercent / 100)}");


        //     double totalNet = Math.Round(invoiceAmount / (1 + ((double)invoiceVatPercent / 100)), 0);
        //     Console.WriteLine($"TOTAL NET: {invoiceAmount} / (1 + ({invoiceVatPercent} / 100))");
        //     // double totalVat = Math.Round(totalNet * ((double)invoiceVatPercent / 100), 0);
        //     var totalVat = invoiceAmount - totalNet;
        //     // Console.WriteLine($"TOTAL VAT: {totalNet} * ({invoiceVatPercent} / 100)");

        //     return $"total net: {totalNet}, total vat: {totalVat}, total amount due: {invoiceAmount}";
        // }
    }
}