import { CompanyAddress } from './Company';
import { AccessStatus } from './AccessStatus';
import { Country } from "./Location";

export interface User {
    accountType: AccountType;
    displayName: string;
    token: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string[];
    image?: string;
    country: Country;
    language: Language;
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
    country: Country;
    language: Language;
    displayName?: string; // max length is 20 characters
    companyAccessStatus?: AccessStatus;
    companyLegalName?: string;
    isMainCompany?: boolean;
    legalCompanyAddress?: CompanyAddress;
    invoiceDescription?: string;
    invoiceAmount?: number; // in the smallest currency unit, ie. Cents
}

export enum AccountType {
    Admin,
    Agent,
    Company,
    Customer
}

export interface RoleFormValues {
    username: string;
    role: string;
}

export enum Language {
    German,
    English,
    Spanish,
    Italian,
    French,
    Portuguese,
    Chinese,
    Japanese
}

