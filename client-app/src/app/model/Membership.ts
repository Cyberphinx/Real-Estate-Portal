export interface Membership {
    id: string;
    contractLength: number;
    description: string;
    expiry: Date;
    isActive: boolean;
    memberSince: Date;
    price: number;
    unit: UnitOfTime;
    vatPercentage: number;
}

export enum UnitOfTime {
    Months,
    Years
}