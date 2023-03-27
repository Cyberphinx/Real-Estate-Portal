using System;

namespace Domain
{
    public class Injection
    {
        public Guid Id { get; set; }
        public DateTime AddedOn { get; set; }
        public string Agency { get; set; }
        public string SpiderTag { get; set; }
    }
}