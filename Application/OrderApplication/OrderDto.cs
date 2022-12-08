using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.OrderAggregate;
using Domain.CompanyAggregate;

namespace Application.OrderApplication
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string BuyerId { get; set; }
        public string BuyerName { get; set; }
        public string BuyerEmail { get; set; }
        public string BuyerPhone { get; set; }
        public string BuyerMessage { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Processing;
        public ServiceCategory ServiceCategory { get; set; }
        public ICollection<OrderAddress> OrderAddresses { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public AcceptanceForm AcceptanceForm { get; set; }
        public string ServiceSchedule { get; set; }
        public string Note { get; set; }
        public ICollection<InvoiceDto> Invoices { get; set; }
        public string PaymentIntentId { get; set; }
        public long CommissionPercentage { get; set; }
        public long Commission { get; set; }
        public Cancellation Cancellation { get; set; }
        public Guid CompanyId { get; set; }
        public Seller Company { get; set; }
    }
}