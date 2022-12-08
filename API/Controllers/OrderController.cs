using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.OrderApplication;
using Domain.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly DataContext _db;

        public OrderController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("buyer")]
        public async Task<IActionResult> GetMyOrdersAsBuyer()
        {
            return HandleResult(await Mediator.Send(new ListMyOrdersAsBuyer.Query()));
        }

        [HttpGet("seller")]
        public async Task<IActionResult> GetMyOrdersAsSeller()
        {
            return HandleResult(await Mediator.Send(new ListMyOrdersAsSeller.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrder(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(Order order)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Order = order}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(Guid id, Order order)
        {
            order.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Order = order}));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{seed}")]
        public async Task Seed()
        {
            await SeedOrders.SeedData(_db);
        }
    }
}