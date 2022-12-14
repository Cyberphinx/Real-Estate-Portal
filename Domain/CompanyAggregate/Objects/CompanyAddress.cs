using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.LocationAggregate;
using Microsoft.EntityFrameworkCore;

namespace Domain.CompanyAggregate
{
    [Owned]
    public class CompanyAddress : Location
    {
        
    }
}