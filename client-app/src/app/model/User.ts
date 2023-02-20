import { CompanyAddress, RedressScheme } from './Company';
import { AccessStatus } from './AccessStatus';

export interface User {
    accountType: AccountType;
    displayName: string;
    token: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string[];
    image?: string;
    country: string;
    language: string;
    addedOn: Date;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    email: string;
    password: string;
    username: string;
    phoneNumber?: string;
    accountType: AccountType;
    addedOn: Date;
    country: string;
    language: string;
    displayName?: string; // max length is 20 characters
    companyAccessStatus?: AccessStatus;
    companyLegalName?: string;
    isMainCompany?: boolean;
    legalCompanyAddress?: CompanyAddress;
    companyNumber?: string;
    icoNumber: string;
    redressScheme: RedressScheme;
    invoiceDescription?: string;
    invoiceAmount?: number; // in the smallest currency unit, ie. Cents
    invoiceCurrency?: string; 
}

export enum AccountType {
    Admin,
    Agent,
    Company,
    Customer
}

export function accountTypeSwitch(user: User) {
    switch (user.accountType.toString()) {
        case "Agent":
            return "Property agent"
        case "Customer":
            return "Individual account"
        case "Company":
            return "Tradesperson"
        case "Admin":
            return "Administrator"
        case "Removalist":
            return "Removalist account"
        default:
            return "Default account"
    }
}

export interface RoleFormValues {
    username: string;
    role: string;
}


