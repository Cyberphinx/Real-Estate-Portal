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
        // private readonly string _baseUrl = "http://localhost:8000/";
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
        public async Task<ActionResult<List<ListingDto>>> ImportListings(List<Listing> injectedListings, CancellationToken cancelToken)
        {
            return HandleResult(await Mediator.Send(new Import.Command{Listings = injectedListings}, cancelToken));
        }

        // [Authorize(Roles = "Admin")]
        // [HttpGet("get")]
        // public async Task<ActionResult<List<ListingDto>>> GetExtractedListings()
        // {
        //     List<ListingDto> listings = new List<ListingDto>();

        //     using (HttpClient client = new HttpClient())
        //     {
        //         // passing base url
        //         client.BaseAddress = new Uri(_baseUrl);
        //         client.DefaultRequestHeaders.Clear();
        //         client.DefaultRequestHeaders.Accept.Add
        //         (
        //             new MediaTypeWithQualityHeaderValue("application/json")
        //         );
        //         client.DefaultRequestHeaders.Add("SpidersApiKey", _config["SpidersApiKey"]);

        //         // sending request to find web api REST service resource GetListings using HttpClient 
        //         HttpResponseMessage response = await client.GetAsync("api/listings");

        //         // checking the response is successful or not which is sent using HttpClient  
        //         if (response.IsSuccessStatusCode)
        //         {
        //             var ObjResponse = response.Content.ReadAsStringAsync().Result;
        //             listings = JsonConvert.DeserializeObject<List<ListingDto>>(ObjResponse);
        //         }
        //         // returning the listings 
        //         return listings;
        //     }
        // }


        // [Authorize(Roles = "Admin")]
        // [HttpGet("save")]
        // public async Task<IActionResult> SaveExtractedListings()
        // {
        //     List<Listing> freshListings = new List<Listing>();

        //     using (HttpClient client = new HttpClient())
        //     {
        //         // passing base url
        //         client.BaseAddress = new Uri(_baseUrl);
        //         client.DefaultRequestHeaders.Clear();
        //         client.DefaultRequestHeaders.Accept.Add
        //         (
        //             new MediaTypeWithQualityHeaderValue("application/json")
        //         );
        //         client.DefaultRequestHeaders.Add("SpidersApiKey", _config["SpidersApiKey"]);

        //         // sending request to find web api REST service resource GetListings using HttpClient 
        //         HttpResponseMessage response = await client.GetAsync("api/listings");

        //         // checking the response is successful or not which is sent using HttpClient  
        //         if (response.IsSuccessStatusCode)
        //         {
        //             var ObjResponse = response.Content.ReadAsStringAsync().Result;
        //             freshListings = JsonConvert.DeserializeObject<List<Listing>>(ObjResponse);
        //         }
        //     }

        //     // SAVE TO DATABASE
        //     // get existing data
        //     var existingListings = await _context.Listings.ToListAsync();

        //     // Loop over fresh data
        //     foreach (var freshListing in freshListings)
        //     {
        //         var company = await _context.Companies
        //                 .ProjectTo<CompanyMinimalDto>(_mapper.ConfigurationProvider)
        //                 .FirstOrDefaultAsync(x => x.CompanyReference == freshListing.Agency);
        //         freshListing.CompanyId = company.Id;

        //         var existingListing = existingListings.FirstOrDefault(x => x.SourceUri == freshListing.SourceUri);
        //         if (existingListing == null)
        //         {
        //             // The listing does not exists, then we insert it to the database
        //             _context.Listings.Add(freshListing);
        //             var result = await _context.SaveChangesAsync() > 0;
        //             if (!result) return BadRequest($"Failed to add {freshListing.SourceUri}");
        //         }
        //     }

        //     // returning the listings 
        //     return Ok($"{freshListings.Count()} listings successfully saved to database!");
        // }

    }
}