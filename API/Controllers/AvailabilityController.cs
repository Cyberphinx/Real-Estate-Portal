using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AvailabilityApplication;
using Domain.CompanyAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AvailabilityController : BaseApiController
    
    {
        [HttpPost]
        public async Task<IActionResult> AddAvailability(Availability availability)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Availability = availability}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailability(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}