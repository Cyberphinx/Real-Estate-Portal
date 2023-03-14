using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.ListingAggregate.Enums;

namespace Application.ListingApplication.ListingDtos
{
    public class ListingCompareDto
    {
        public Guid Id { get; set; }
        public string SourceUri { get; set; }
        public string IndexPageUri { get; set; }
        public double Price { get; set; }
        public LifeCycleStatus LifeCycleStatus { get; set; }
        public ICollection<ChangeLogDto> ChangeLogs { get; set; }
    }
}