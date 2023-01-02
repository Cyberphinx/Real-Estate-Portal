using Domain.CompanyAggregate.Enums;
using System;

namespace Application.CompanyApplication.CompanyDtos
{
    public class CompanyContentDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public CompanyMediaType Type { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public bool IsLogo { get; set; }
    }
}