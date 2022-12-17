import { Invoice } from './JobAggregate/Invoice';

export interface Membership {
    id: string;
    companyReference: string;
    contractLength: number;
    memberSince: Date;
    expiry: Date;
    description: string;
    price: number;
    invoices: Invoice[]
    isActive: boolean;
    unit: UnitOfTime;
    username: string;
    vatPercentage: number;
}

export enum UnitOfTime {
    Months,
    Years
}