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

        [Authorize(Roles = "Admin, Agency, Company, Removalist")]
        [HttpPost]
        public async Task<IActionResult> CreateCompany(Company company)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Company = company}));
        }

        [Authorize(Policy = "IsCompanyOwner")]
        [HttpPut("{companyId}")]
        public async Task<IActionResult> EditCompany(Guid companyId, Company company)
        {
            company.Id = companyId;
            return HandleResult(await Mediator.Send(new Edit.Command{Company = company}));
        }

        [Authorize(Policy = "IsCompanyOwner")]
        [HttpDelete("{companyId}")]
        public async Task<IActionResult> DeleteCompany(Guid companyId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = companyId}));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("all")]
        public async Task<IActionResult> DeleteListings()
        {
            return HandleResult(await Mediator.Send(new DeleteRange.Command()));
        }

        // [Authorize(Roles = "Admin")]
        // [HttpPost("{seed}")]
        // public async Task Seed()
        // {
        //     await SeedCompanies.SeedData(_db);
        // }

        [HttpGet("listings")]
        public async Task<IActionResult> GetCompanyListings([FromQuery]AgentListingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListListings.Query{Params = param}));
        }

        [HttpGet("listings-count/{companyId}")]
        public async Task<IActionResult> CountCompanyListings(Guid companyId)
        {
            return HandleResult(await Mediator.Send(new ListListingsCounts.Query{companyId = companyId}));
        }

    }
}