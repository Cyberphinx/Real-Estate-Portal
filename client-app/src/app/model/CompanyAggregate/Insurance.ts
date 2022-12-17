export interface Insurance {
    id: string;
    type: InsuranceType;
    insurer: string;
    amount: string;
    startDate: Date | null;
    endDate: Date | null;
}

export enum InsuranceType {
    ProfessionalIndemnity,
    PublicLiability
}