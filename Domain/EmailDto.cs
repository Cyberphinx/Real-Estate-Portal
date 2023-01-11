using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate.Enums;

namespace Domain
{
    public class EmailDto
    {
        public string RecipientName { get; set; }
        public string RecipientEmail { get; set; }
        public string RecipientPhone { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public AccountType AccountType { get; set; }
    }
}