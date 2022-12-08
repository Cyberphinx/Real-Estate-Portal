export interface Availability {
    id?: number;
    available: boolean;
    startTime: Date;
    endTime: Date;
    companyId?: string;
}