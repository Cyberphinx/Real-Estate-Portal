import { PaymentStatus } from "./PaymentStatus";

// for AppUser invoices
export interface UserInvoice {
    id: string;
    amount: number;
    currency: string;
    description: string;
    invoiceDate: Date;
    index: number;
    isQuotation: boolean;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
    paymentIntentId?: string;
    clientSecret?: string;
    appUserId?: string;
}

export class UserInvoice implements UserInvoice {
    constructor(initialValues?: UserInvoiceFormValues) {
        Object.assign(this, initialValues);
    }
}

export class UserInvoiceFormValues {
    id?: string = '';
    amount?: number = undefined;
    currency: string = 'gbp';
    description: string = '';
    invoiceDate?: Date = undefined;
    index?: number = undefined;
    isQuotation: boolean = false;
    items: InvoiceItem[] = [];
    paymentStatus: PaymentStatus = PaymentStatus.InProgress;
    title: string = '';
    vatPercentage: number = 20;
    appUserId?: string = '';

    constructor(invoice?: UserInvoiceFormValues) {
        if (invoice) {
            this.id = invoice.id;
            this.amount = invoice.amount;
            this.currency = invoice.currency;
            this.description = invoice.description;
            this.invoiceDate = invoice.invoiceDate;
            this.index = invoice.index;
            this.isQuotation = invoice.isQuotation;
            this.items = invoice.items;
            this.paymentStatus = invoice.paymentStatus;
            this.title = invoice.title;
            this.vatPercentage = invoice.vatPercentage;
            this.appUserId = invoice.appUserId;
        }
    }
}


// for Job invoices
export interface JobInvoice {
    id: string;
    amount: number;
    currency: string;
    description: string;
    invoiceDate: Date;
    index: number;
    isQuotation: boolean;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
    sellerUsername: string;
    paymentIntentId?: string;
    clientSecret?: string;
    jobId: string;
}

export class JobInvoice implements JobInvoice {
    constructor(initialValues?: JobInvoiceFormValues) {
        Object.assign(this, initialValues);
    }
}

export class JobInvoiceFormValues {
    id?: string = '';
    amount: number = 0;
    currency: string = 'gbp';
    description: string = '';
    invoiceDate: Date = new Date();
    index: number = 0;
    isQuotation: boolean = false;
    items: InvoiceItem[] = [];
    paymentStatus: PaymentStatus = PaymentStatus.InProgress;
    title: string = '';
    vatPercentage: number = 20;
    jobId: string = ''

    constructor(invoice?: JobInvoiceFormValues) {
        if (invoice) {
            this.id = invoice.id;
            this.amount = invoice.amount;
            this.currency = invoice.currency;
            this.description = invoice.description;
            this.invoiceDate = invoice.invoiceDate;
            this.index = invoice.index;
            this.isQuotation = invoice.isQuotation;
            this.items = invoice.items;
            this.paymentStatus = invoice.paymentStatus;
            this.title = invoice.title;
            this.vatPercentage = invoice.vatPercentage;
            this.jobId = invoice.jobId;
        }
    }
}


export interface InvoiceItem {
    id?: string;
    amount: number;
    currency: string;
    description: string;
    title: string;
    vatPercentage: number;
}