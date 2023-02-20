import { PaymentStatus } from "./PaymentStatus";

export interface Invoice {
    id?: string;
    amount: number;
    currency: string;
    description: string;
    invoiceDate: Date;
    invoiceNumber: number;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
    paymentIntentId?: string;
    clientSecret?: string;
}

export interface InvoiceItem {
    id?: string;
    amount: number;
    currency: string;
    description: string;
    title: string;
    vatPercentage: number;
}