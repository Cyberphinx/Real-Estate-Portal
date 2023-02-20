using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.CalendarAggregate
{
    public class CalendarEvent
    {
        public Guid Id { get; set; }
        public DateTime EventDate { get; set; }
        public string EventDescription { get; set; }
        public string Username { get; set; }
    }
}