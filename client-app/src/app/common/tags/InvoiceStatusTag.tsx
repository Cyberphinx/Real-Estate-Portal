import React from "react";
import { PaymentStatus } from "../../model/PaymentStatus";
import { Invoice } from "../../model/Profile";
import './InvoiceStatusTag.css';

interface Props {
    invoice: Invoice | null;
}

export default function InvoiceStatusTag({ invoice }: Props) {
    const tagStyle = (invoice: Invoice) => {
        switch (invoice?.paymentStatus) {
            case 0:
                return "payment-tag red"
            case 1:
                return "payment-tag red"
            case 2:
                return "payment-tag green"
            case 3:
                return "payment-tag amber"
            case 4:
                return "payment-tag grey"
            case 5:
                return "payment-tag grey"
            case 6:
                return "payment-tag amber"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className={tagStyle(invoice!)} >
            Payment {PaymentStatus[invoice!.paymentStatus].replace(/[A-Z]/g, ' $&').trim()}
            </span>
        </div>

    );
}