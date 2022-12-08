using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain.OrderAggregate
{
    public class OrderAddress : Location
    {
        public Guid Id { get; set; }
        public bool IsCurrentAddress { get; set; }
        public string FullName { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}