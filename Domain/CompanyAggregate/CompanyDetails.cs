using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.CompanyAggregate
{
    [Owned]
    public class CompanyDetails
    {
        public string CompanyType { get; set; }
        public bool VatRegistered { get; set; }
        public string VatNumber { get; set; }
        public string CompanyNumber { get; set; }
        public string RegisteredIn { get; set; }
        public string BusinessOwner { get; set; }
        public bool IdChecked { get; set; }
        public bool AddressVerified { get; set; }
        public int SortCode { get; set; }
        public int AccountNumber { get; set; }
        public string BankName { get; set; }
    }
}