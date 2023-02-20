using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobApplication;
using Domain.JobAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class JobController : BaseApiController
    {
        private readonly DataContext _db;

        public JobController(DataContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetJobs([FromQuery]JobParams param)
        {
            // get public jobs without customer's contact details (without Removals jobs)
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [Authorize(Roles = "Removalist")]
        [HttpGet("removals")]
        public async Task<IActionResult> GetRemovalsJobsLeads([FromQuery]JobParams param)
        {
            // get Removals jobs with customer's contact details (for specific moving company only)
            return HandlePagedResult(await Mediator.Send(new ListRemovals.Query{Params = param}));
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
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Policy = "LeadsAccess")]
        [HttpGet("{jobId}/leads")]
        public async Task<ActionResult> GetJobWithLeads(Guid jobId)
        {
            // get a paid job leads with customer's contact details
            return HandleResult(await Mediator.Send(new DetailsWithLeads.Query{Id = jobId}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateJob(Job job)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Job = job}));
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
            return HandleResult(await Mediator.Send(new SetMainImage.Command{JobId = jobId, JobMediaId = jobMediaId}));
        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpDelete("{jobId}/{jobMediaId}")]
        public async Task<IActionResult> DeleteMedia(string jobId, string jobMediaId)
        {
            return HandleResult(await Mediator.Send(new DeleteMedia.Command{JobId = jobId, JobMediaId = jobMediaId}));
        }

        [Authorize(Policy = "IsJobOwner")]
        [HttpPut("{jobId}")]
        public async Task<IActionResult> EditJob(Guid jobId, Job job)
        {
            job.Id = jobId;
            return HandleResult(await Mediator.Send(new Edit.Command{Job = job}));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("apply/{id}")]
        public async Task<IActionResult> Apply(Guid id)
        {
            return HandleResult(await Mediator.Send(new ExpressInterest.Command{Id = id}));
        }

        [HttpPost("shortlist/{id}/{username}")]
        public async Task<IActionResult> Shortlist(Guid id, string username)
        {
            return HandleResult(await Mediator.Send(new ShortlistApplicant.Command{Id = id, ApplicantUsername = username}));
        }

        // [Authorize(Roles = "Admin")]
        // [HttpPost("{seed}")]
        // public async Task Seed()
        // {
        //     await SeedJobs.SeedData(_db);
        // }
    }
}