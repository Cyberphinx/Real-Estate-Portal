export interface Membership {
    id: string;
    description: string;
    expiry: Date;
    isActive: boolean;
    memberSince: Date;
}

export enum UnitOfTime {
    Months,
    Years
}