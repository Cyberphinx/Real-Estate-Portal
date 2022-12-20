using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ProfileApplication;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Username = username}));
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/jobs")]
        public async Task<IActionResult> GetUserJobs(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListJobs.Query{Username = username, Predicate = predicate}));
        }

        [HttpGet("{username}/listings")]
        public async Task<IActionResult> GetUserSavedListings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListSavedListings.Query{Username = username, Predicate = predicate}));
        }
    }
}