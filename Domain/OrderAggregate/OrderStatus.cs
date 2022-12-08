using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.OrderAggregate
{
    public enum OrderStatus
    {
        Processing,
        Completed,
        Cancelled,
        Failed,
        Expired,
        OnHold
    }
}