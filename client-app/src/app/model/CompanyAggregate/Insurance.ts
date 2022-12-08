export interface Insurance {
    id: number;
    type: string;
    insurer: string;
    amount: string;
    startDate: Date | null;
    endDate: Date | null;
}