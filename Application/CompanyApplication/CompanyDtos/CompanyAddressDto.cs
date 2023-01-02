using System;
using Domain.LocationAggregate;

namespace Application.CompanyApplication.CompanyDtos
{
    public class CompanyAddressDto : Location
    {
        public Guid Id { get; set; }
        
    }
}