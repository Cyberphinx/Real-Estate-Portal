import React from "react";
import { JobInvoice, UserInvoice } from "../../model/Invoice";
import { PaymentStatus, paymentStatusFormatter } from "../../model/PaymentStatus";
import './InvoiceStatusTag.css';

interface Props {
    invoice: JobInvoice | UserInvoice | null;
}

export default function InvoiceStatusTag({ invoice }: Props) {
    const tagStyle = (invoice: JobInvoice | UserInvoice) => {
        switch (invoice?.paymentStatus.toString()) {
            case "Unpaid":
                return "payment-tag red"
            case "Pending":
                return "payment-tag red"
            case "Paid":
                return "payment-tag green"
            case "Cancelled":
                return "payment-tag amber"
            case "Refunded":
                return "payment-tag grey"
            case "Waived":
                return "payment-tag grey"
            case "InProgress":
                return "payment-tag amber"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className={tagStyle(invoice!)} >
                {paymentStatusFormatter(invoice!.paymentStatus)}
            </span>
        </div>

    );
}