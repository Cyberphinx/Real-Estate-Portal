using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.JobAggregate.Enums;

namespace Application.JobApplication.JobDtos
{
    public class JobCalendar
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime FinishBy { get; set; }
        public string JobReference { get; set; }
        public JobLifeCycle JobLifeCycle { get; set; }
    }
}