using System;

namespace Application.CompanyApplication.CompanyDtos
{
    public class CompanyContactsDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
    }
}