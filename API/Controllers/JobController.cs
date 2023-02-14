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
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllJobs()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateJob(Job job)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Job = job}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditJob(Guid id, Job job)
        {
            job.Id = id;
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