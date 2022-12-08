export interface TenantEligibility {
    dss: Eligibility;
    students: Eligibility;
}

export enum Eligibility {
    accepted,
    excluded,
    only
}