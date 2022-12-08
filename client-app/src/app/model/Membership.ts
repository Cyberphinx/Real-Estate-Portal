import { PaymentStatus } from './PaymentStatus';
import { UnitOfTime } from './UnitOfTime';

export interface Membership {
    id: string;
    username: string;
    companyReference: string;
    contractLength: number;
    contractStart: Date;
    contractEnd: Date;
    price: number;
    unit: UnitOfTime;
    paymentStatus: PaymentStatus;
    comissionPercentage: number;
    description: string;
}