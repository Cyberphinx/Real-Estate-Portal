import { Company } from '../CompanyAggregate/Company';
import { OrderStatus } from './OrderStatus';
import { Cancellation } from './Cancellation';
import { AcceptanceForm } from './AcceptanceForm';
import { Invoice } from './Invoice';
import { ServiceCategory } from '../ServiceCategory';
import { OrderAddress } from './OrderAddress';

export interface Order {
    id: string;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerMessage: string;
    orderDate: Date;
    orderStatus: OrderStatus;
    serviceCategory: ServiceCategory;
    orderAddresses: OrderAddress[];
    startTime: Date;
    endTime: Date;
    acceptanceForm: AcceptanceForm;
    serviceSchedule: string;
    note: string;
    invoices: Invoice[];
    paymentIntentId: string;
    commissionPercentage: number;
    commission: number;
    cancellation: Cancellation;
    companyId?: string;
    company: Company;
}

export class Order implements Order {
    constructor(init?: OrderFormValues) {
        Object.assign(this, init);
    }
}

export class OrderFormValues {
    id?: string;
    buyerId: string = "";
    buyerName: string = "";
    buyerEmail: string = "";
    buyerPhone: string = "";
    buyerMessage: string = "";
    orderDate: Date = new Date();
    orderStatus: OrderStatus = OrderStatus.Processing;
    serviceCategory: ServiceCategory = ServiceCategory.Moving;
    orderAddresses?: OrderAddress[];
    startTime: Date = new Date();
    endTime: Date = new Date();
    serviceSchedule?: string;
    note?: string;
    companyId?: string;

    constructor(order?: OrderFormValues) {
        if (order) {
            this.id = order.id;
            this.buyerId = order.buyerId;
            this.orderDate = order.orderDate;
            this.orderStatus = order.orderStatus;
            this.serviceCategory = order.serviceCategory;
            this.orderAddresses = order.orderAddresses;
            this.startTime = order.startTime;
            this.endTime = order.endTime;
            this.serviceSchedule = order.serviceSchedule;
            this.note = order.note;
            this.companyId = order.companyId;
        }
    }
}