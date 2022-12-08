import { PaymentStatus } from "../PaymentStatus";

export interface Invoice {
    id?: string;
    invoiceNumber: number;
    invoiceDate: Date;
    items: InvoiceItem[];
    paymentIntentId: string;
    clientSecret: string;
    totalNet: number;
    totalVat: number;
    total: number;
    paymentStatus: PaymentStatus;
    orderId?: string;
}

export interface InvoiceItem {
    id?: string;
    description: string;
    price: number;
    vatPercentage: number;
    vat: number;
    total: number;
    invoiceId?: string;
}