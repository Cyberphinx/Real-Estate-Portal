using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.CompanyAggregate;
using Domain.JobAggregate.Objects;
using Domain.JobAggregate.Enums;

namespace Application.JobApplication.JobDtos
{
    public class JobPublicDto
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerImage { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime FinishBy { get; set; }
        public List<string> ServiceCategories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string JobReference { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
        public ICollection<JobMediaDto> JobMedia { get; set; }
        public ICollection<JobLocationPublicDto> JobLocations { get; set; }
        public ICollection<NetworkPublicDto> Networks { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public string PropertyType { get; set; }
        public string DeclaredlValue { get; set; }
        public bool StorageRequired { get; set; }
        public string StorageValue { get; set; }
        public bool PackingRequired { get; set; }
    }
}