using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class CompanyAccessor : ICompanyAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CompanyAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetCompanyId()
        {
            var companyId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "companyId").Value.ToString());

            return companyId;
        }

    }
}