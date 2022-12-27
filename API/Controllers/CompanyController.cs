using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CompanyApplication;
using Domain.CompanyAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class CompanyController : BaseApiController
    
    {
        private readonly DataContext _db;

        public CompanyController(DataContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCompanies([FromQuery]CompanyParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCompanies()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query()));
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Roles = "Admin, Agency, Company")]
        [HttpPost]
        public async Task<IActionResult> CreateCompany(Company company)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Company = company}));
        }

        [Authorize(Policy = "IsCompanyOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompany(Guid id, Company company)
        {
            company.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Company = company}));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("all")]
        public async Task<IActionResult> DeleteListings()
        {
            return HandleResult(await Mediator.Send(new DeleteRange.Command()));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{seed}")]
        public async Task Seed()
        {
            await SeedCompanies.SeedData(_db);
        }
        
        [Authorize(Policy = "IsCompanyOwner")]
        [HttpGet("listings/{id}")]
        public async Task<IActionResult> GetCompanyListings(Guid id, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListListings.Query{CompanyId = id, Predicate = predicate}));
        }

    }
}