import React from "react";
import { Invoice } from "../../model/Invoice";
import { PaymentStatus } from "../../model/PaymentStatus";
import './InvoiceStatusTag.css';

interface Props {
    invoice: Invoice | null;
}

export default function InvoiceStatusTag({ invoice }: Props) {
    const tagStyle = (invoice: Invoice) => {
        switch (invoice?.paymentStatus) {
            case 0:
                return "payment-tag pending"
            case 1:
                return "payment-tag received"
            case 2:
                return "payment-tag failed"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className={tagStyle(invoice!)} >
            Payment {PaymentStatus[invoice!.paymentStatus]}
            </span>
        </div>

    );
}