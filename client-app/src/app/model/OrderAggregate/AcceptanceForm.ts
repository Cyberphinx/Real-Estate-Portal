import { Order } from "./Order";

export interface AcceptanceForm {
    id?: string;
    goodsValue: number;
    storageRequired: boolean;
    goodsValueToBeStored: number;
    termsAndConditions: string;
    lastModified: Date;
    accepted: boolean;
    acceptanceTime: Date;
    orderId?: string;
}