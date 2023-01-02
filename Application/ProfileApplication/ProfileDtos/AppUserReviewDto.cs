using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.ProfileApplication.ProfileDtos
{
    public class AppUserReviewDto : Review
    {
        public Guid Id { get; set; }
        
    }
}