using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.ListingApplication;
using Domain;
using Domain.ListingAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{   
    public class ListingController : BaseApiController
    {
        private readonly DataContext _db;

        public ListingController(DataContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetListings([FromQuery]ListingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllListings()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListing(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpGet("max")]
        public async Task<IActionResult> GetMaxValues()
        {
            return HandleResult(await Mediator.Send(new GetMaxValues.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateListing(Listing listing)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Listing = listing}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditListing(Guid id, Listing listing)
        {
            listing.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Listing = listing}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpDelete("agency/{companyReference}")]
        public async Task<IActionResult> DeleteListings(string companyReference)
        {
            return HandleResult(await Mediator.Send(new DeleteRange.Command{CompanyReference = companyReference}));
        }

        [HttpPost("seed/{companyReference}/{amount}")]
        public async Task Seed(string companyReference, int amount)
        {
            await SeedRandomListings.SeedRandomData(_db, companyReference, amount);
        }

    }
}