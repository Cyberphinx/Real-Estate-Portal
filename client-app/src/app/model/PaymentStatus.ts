export enum PaymentStatus {
    Unpaid,
    Pending,
    Paid,
    Cancelled,
    Refunded,
    Waived,
    InProgress
}

export const paymentStatusFormatter = (status: PaymentStatus) => {
    switch (status.toString()) {
        case "Unpaid":
            return "Waiting for payment"
        case "Pending":
            return "Payment Pending"
        case "Paid":
            return "Payment successful"
        case "Cancelled":
            return "Payment cancelled"
        case "Refunded":
            return "Payment refunded"
        case "InProgress":
            return "Payment in progress"
        default:
            return "Waiting for payment"
    }
}