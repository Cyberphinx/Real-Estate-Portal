using Application.ListingApplication.ListingDtos;
using Application.SpidersApplication;
using AutoMapper;
using Domain.ListingAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class SpidersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public SpidersController(DataContext context, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("import")]
        [RequestSizeLimit(100_000_000)]
        public async Task<ActionResult<List<ListingDto>>> ImportListings(List<Listing> injectedListings, CancellationToken cancelToken)
        {
            var headers = Request.Headers["pageNumber"];



            return HandleResult(await Mediator.Send(new Import.Command{Listings = injectedListings}, cancelToken));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("purge/{agency}")]
        [RequestSizeLimit(100_000_000)]
        public async Task<ActionResult<string>> PurgeLegacyListings(string agency, CancellationToken cancelToken)
        {
            return HandleResult(await Mediator.Send(new Purge.Command{Agency = agency}, cancelToken));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("headers")]
        public ActionResult<string> TestHeaders(List<Listing> injectedListings, CancellationToken cancelToken)
        {
            var headers = Request.Headers["pageNumber"];

            return Ok($"Page Number is: {headers}");
        }

    }
}