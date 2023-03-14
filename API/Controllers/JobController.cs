using API.Extensions;
using Application.CompanyApplication.CompanyDtos;
using Application.JobApplication;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.AppUserAggregate;
using Domain.JobAggregate;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using MimeKit;
using Persistence;

namespace API.Controllers
{
    public class JobController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly EmailService _emailService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public JobController(DataContext context, EmailService emailService,
        IWebHostEnvironment webHostEnvironment, UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _emailService = emailService;
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetJobs([FromQuery] JobParams param)
        {
            // get public jobs without customer's contact details (without Removals jobs)
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [Authorize(Roles = "Removalist")]
        [HttpGet("removals")]
        public async Task<IActionResult> GetRemovalsJobsLeads([FromQuery] JobParams param)
        {
            // get Removals jobs with customer's contact details (for specific moving company only)
            return HandlePagedResult(await Mediator.Send(new ListRemovals.Query { Params = param }));
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllJobs()
        {
            // get all public jobs without customer's contact details
            return HandleResult(await Mediator.Send(new ListAll.Query()));
        }

        [AllowAnonymous]
        [HttpGet("allRemovals")]
        public async Task<IActionResult> GetAllRemovalsJobs()
        {
            // get all Removals jobs for calendar view (for specific moving company only)
            return HandleResult(await Mediator.Send(new ListAllRemovals.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetJob(Guid id)
        {
            // get a public job without customer's contact details
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize(Policy = "LeadsAccess")]
        [HttpGet("{jobId}/leads")]
        public async Task<ActionResult> GetJobWithLeads(Guid jobId)
        {
            // get a paid job leads with customer's contact details
            return HandleResult(await Mediator.Send(new DetailsWithLeads.Query { Id = jobId }));
        }

        // [AllowAnonymous]
        // [HttpPost]
        // public async Task<IActionResult> CreateJob(Job job)
        // {
        //     return HandleResult(await Mediator.Send(new Create.Command { Job = job }));
        // }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateJobWithEmail(Job job)
        {
            // CREATE A JOB 
            var result = await Mediator.Send(new Create.Command { Job = job });
            if (result == null) return NotFound();
            if (!result.IsSuccess) return BadRequest(result.Error);

            // get all matching service companies
            var traders = await _context.Companies
                .Where(x => x.ServiceCategories.Any(item => job.ServiceCategories.Contains(item)))
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            Console.WriteLine($"The number of traders in {String.Join(Environment.NewLine, job.ServiceCategories.Select(x => String.Join(", ", x)))} job categories are {traders.Count()}");
            
            // BELOW IS FOR EMAIL CONFIRMATIONS
            // the header "origin" is only set by the browser during a CORS request, so it will not show up if tested under Postman, etc.
            var origin = Request.Headers["origin"];

            // RETRIEVE CUSTOMER CONTACT DETAILS
            // var job = await _context.Jobs.Include(x => x.Networks).ThenInclude(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == invoice.JobId);
            // if (job == null) return NotFound("Cannot find the job that is associated with the invoice");

            var customer = job.MapJobToCustomerContactsDto();

            // EMAIL MESSAGE BODY
            var customerEmail = CreateJobEmailToCustomer(job, origin, "JobEmailToCustomer.html");
            var traderEmail = CreateJobEmailToSeller(job, origin, "JobEmailToTrader.html");

            // SendinBlue - send quotation/invoice email to customer
            var emailToCutomer = new EmailDto
            {
                RecipientName = customer.CustomerName,
                RecipientEmail = customer.CustomerEmail,
                // RecipientPhone = customer.CustomerPhone,
                Subject = "😺 You have created a job on Sanctum",
                Body = customerEmail,
                AccountType = Domain.AppUserAggregate.Enums.AccountType.Customer
            };
            await _emailService.SendEmailAsync(emailToCutomer);


            // SendinBlue - send quotation/invoice email to each matching trader
            foreach (var trader in traders)
            {
                Console.WriteLine($"The trader is: {trader.DisplayName}");
                Console.WriteLine($"The trader's email is: {trader.CompanyContacts.Email}");

                var emailToTrader = new EmailDto
                {
                    RecipientName = trader.DisplayName,
                    RecipientEmail = trader.CompanyContacts.Email,
                    // RecipientPhone = trader.PhoneNumber,
                    Subject = $"😺 New {String.Join(Environment.NewLine, job.ServiceCategories.Select(x => String.Join(", ", x)))} job in {job.JobLocations.FirstOrDefault(x => x.Index == 0).TownOrCity}!",
                    Body = traderEmail,
                    // AccountType = trader.AccountType
                };
                await _emailService.SendEmailAsync(emailToTrader);
            }

            return Ok("Job created successfully - please check email");

        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpPost("media/{jobId}")]
        public async Task<IActionResult> AddMedia([FromForm] AddMedia.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpPost("{jobId}/setMainImage/{jobMediaId}")]
        public async Task<IActionResult> SetMainImage(string jobId, string jobMediaId)
        {
            return HandleResult(await Mediator.Send(new SetMainImage.Command { JobId = jobId, JobMediaId = jobMediaId }));
        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpDelete("{jobId}/{jobMediaId}")]
        public async Task<IActionResult> DeleteMedia(string jobId, string jobMediaId)
        {
            return HandleResult(await Mediator.Send(new DeleteMedia.Command { JobId = jobId, JobMediaId = jobMediaId }));
        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpPut("{jobId}")]
        public async Task<IActionResult> EditJob(Guid jobId, Job job)
        {
            job.Id = jobId;
            return HandleResult(await Mediator.Send(new Edit.Command { Job = job }));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("apply/{id}")]
        public async Task<IActionResult> Apply(Guid id)
        {
            return HandleResult(await Mediator.Send(new ExpressInterest.Command { Id = id }));
        }

        [HttpPost("shortlist/{id}/{username}")]
        public async Task<IActionResult> Shortlist(Guid id, string username)
        {
            return HandleResult(await Mediator.Send(new ShortlistApplicant.Command { Id = id, ApplicantUsername = username }));
        }

        // [Authorize(Roles = "Admin")]
        // [HttpPost("{seed}")]
        // public async Task Seed()
        // {
        //     await SeedJobs.SeedData(_context);
        // }

        private string CreateJobEmailToSeller(Job job, StringValues origin, string emailTemplate)
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
            // {0} : job service category
            var categories = String.Join(Environment.NewLine, job.ServiceCategories.Select(x => String.Join(", ", x)));
            // {1} : job city
            // {2} : job reference
            // {3} : customer contacts
            var customerContacts = "";
            if (job.ServiceCategories.Contains("Removals"))
            {
                customerContacts = $"<p>Customer name: {customer.CustomerName}</p><p>Customer email: {customer.CustomerEmail}</p><p>Customer email: {customer.CustomerPhone}</p><p>------------------------------------------------------------</p>";
            }
            else customerContacts = "";
            // {4} job title
            // {5} : finishBy date (or "Move date" for removals jobs)
            var finishBy = String.Format("{0:dddd, d MMMM yyyy}", job.FinishBy);
            var deadline = job.ServiceCategories.Contains("Removals") ? $"Move date: <b>{finishBy}</b>" : $"Finish by: <b>{finishBy}</b>";
            // {6} : addedOn date
            // {7} : job addresses
            var addresses = "";
            foreach (var item in job.JobLocations)
            {
                var index = item.Index;
                var addressType = item.AddressType;
                var displayAddress = item.DisplayAddress;
                addresses += $"<p>{index} - {addressType}</p><p>{displayAddress}</p>";
            }
            // {8} : job description
            string messageBody = string.Format(builder.HtmlBody,
                        categories,
                        job.JobLocations.FirstOrDefault(x => x.Index == 0).TownOrCity,
                        job.Id,
                        customerContacts,
                        job.Title,
                        deadline,
                        String.Format("{0:dddd, d MMMM yyyy}", job.AddedOn),
                        addresses,
                        job.Description
                        );

            return messageBody;
        }

        private string CreateJobEmailToCustomer(Job job, StringValues origin, string emailTemplate)
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
            // {0} : customer name
            // {1} : job reference
            // {2} : job title
            // {3} : finishBy date (or "Move date" for removals jobs)
            var finishBy = String.Format("{0:dddd, d MMMM yyyy}", job.FinishBy);
            var deadline = job.ServiceCategories.Contains("Removals") ? $"Move date: <b>{finishBy}</b>" : $"Finish by: <b>{finishBy}</b>";
            // {4} : addedOn date
            // {5} : job addresses
            var addresses = "";
            foreach (var item in job.JobLocations)
            {
                var index = item.Index;
                var addressType = item.AddressType;
                var displayAddress = item.DisplayAddress;
                addresses += $"<p>{index} - {addressType}</p><p>{displayAddress}</p>";
            }
            // {6} : job description
            string messageBody = string.Format(builder.HtmlBody,
                        customer.CustomerName,
                        job.Id,
                        job.Title,
                        deadline,
                        String.Format("{0:dddd, d MMMM yyyy}", job.AddedOn),
                        addresses,
                        job.Description
                        );

            return messageBody;
        }
    }
}