using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.JobAggregate.Enums;
using Domain.JobAggregate.Objects;
using Domain.InvoiceAggregate;

namespace Domain.JobAggregate
{
    public class Job
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerImage { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime FinishBy { get; set; }
        public List<string> ServiceCategories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string JobReference { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
        public ICollection<JobMedia> JobMedia { get; set; }
        public ICollection<JobLocation> JobLocations { get; set; }
        public ICollection<JobNetwork> Networks { get; set; } = new List<JobNetwork>();
        public ICollection<JobInvoice> Invoices { get; set; } = new List<JobInvoice>();
        public ICollection<JobMessage> Messages { get; set; } = new List<JobMessage>();
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public string PropertyType { get; set; }
        public bool Commercial { get; set; }
        public string DeclaredlValue { get; set; }
        public bool StorageRequired { get; set; }
        public string StorageValue { get; set; }
        public bool PackingRequired { get; set; }
    }
}