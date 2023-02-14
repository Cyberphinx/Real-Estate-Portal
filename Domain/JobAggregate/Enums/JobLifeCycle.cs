namespace Domain.JobAggregate.Enums
{
    public enum JobLifeCycle
    {
        Open,
        InProgress,
        Cancelled,
        Completed,
        Paid,
        InDispute,
        Refunded
    }
}