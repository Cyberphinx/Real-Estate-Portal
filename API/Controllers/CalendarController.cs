using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CalendarApplication;
using Domain.CalendarAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class CalendarController : BaseApiController
    {
        private readonly DataContext _db;

        public CalendarController(DataContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetEvents(string username)
        {
            // get all public jobs without customer's contact details
            return HandleResult(await Mediator.Send(new List.Query{Username = username}));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpPost("{username}")]
        public async Task<IActionResult> CreateEvent(CalendarEvent calendarEvent)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Event = calendarEvent}));
        }
        
        [Authorize(Policy = "IsOwner")]
        [HttpDelete("{username}/{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}