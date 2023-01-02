using System;
using Domain;

namespace Application.CompanyApplication.CompanyDtos
{
    public class CompanyReviewDto : Review
    {
        public Guid Id { get; set; }

    }
}