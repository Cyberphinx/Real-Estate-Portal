import { PaymentStatus } from "../PaymentStatus";

export interface Invoice {
    id?: string;
    amount: number;
    description: string;
    invoiceDate: Date;
    InvoiceNumber: number;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
}

export interface InvoiceItem {
    id?: string;
    amount: number;
    description: string;
    title: string;
    vatPercentage: number;
}

export interface InvoiceDto {
    id?: string;
    amount: number;
    description: string;
    invoiceDate: Date;
    InvoiceNumber: number;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
}