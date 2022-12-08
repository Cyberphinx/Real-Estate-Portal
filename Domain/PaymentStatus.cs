using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public enum PaymentStatus
    {
        Unpaid,
        Pending,
        Paid,
        Failed,
        Waived
    }
}