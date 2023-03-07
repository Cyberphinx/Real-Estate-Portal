using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.ListingApplication.ListingDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Persistence;

namespace API.Controllers
{
    public class SpidersController : BaseApiController
    {
        // private readonly string _baseUrl = "https://dawn-smoke-7706.fly.dev/";
        private readonly string _baseUrl = "http://localhost:8000/";
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public SpidersController(DataContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<ListingDto>>> GetExtractedListings()
        {
            List<ListingDto> listings = new List<ListingDto>();

            using (HttpClient client = new HttpClient())
            {
                // passing base url
                client.BaseAddress = new Uri(_baseUrl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add
                (
                    new MediaTypeWithQualityHeaderValue("application/json")
                );
                client.DefaultRequestHeaders.Add("SpidersApiKey", _config["SpidersApiKey"]);

                // sending request to find web api REST service resource GetListings using HttpClient 
                HttpResponseMessage response = await client.GetAsync("api/listings");

                // checking the response is successful or not which is sent using HttpClient  
                if (response.IsSuccessStatusCode)
                {

                    var ObjResponse = response.Content.ReadAsStringAsync().Result;
                    listings = JsonConvert.DeserializeObject<List<ListingDto>>(ObjResponse);
                }
                // returning the listings 
                return listings;
            }
        }
    }
}