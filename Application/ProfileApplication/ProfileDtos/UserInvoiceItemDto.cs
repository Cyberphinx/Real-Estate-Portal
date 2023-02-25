using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ProfileApplication.ProfileDtos
{
    public class UserInvoiceItemDto
    {
        public Guid Id { get; set; }
        public long Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public long VatPercentage { get; set; }
        public Guid AppUserInvoiceId { get; set; }
    }
}