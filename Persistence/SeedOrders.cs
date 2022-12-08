using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.OrderAggregate;

namespace Persistence
{
    public class SeedOrders
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Orders.Any()) return;
            
            var orders = new List<Order>
            {
                new Order
                {
                    BuyerId = "lily",
                    OrderDate = DateTime.Today,
                    OrderStatus = OrderStatus.Processing,
                    ServiceCategory = ServiceCategory.Cleaning,
                    StartTime = DateTime.Today,
                    EndTime = DateTime.Today,
                },
                new Order
                {
                    BuyerId = "jack",
                    OrderDate = DateTime.Today,
                    OrderStatus = OrderStatus.Processing,
                    ServiceCategory = ServiceCategory.Moving,
                    StartTime = DateTime.Today,
                    EndTime = DateTime.Today,
                },
            };

            await context.Orders.AddRangeAsync(orders);
            await context.SaveChangesAsync();
        }
    }
}