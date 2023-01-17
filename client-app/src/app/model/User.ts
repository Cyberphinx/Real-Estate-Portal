import { CompanyAddress, RedressScheme } from './Company';
import { AccessStatus } from './AccessStatus';
import { Currency } from './ListingAggregate/ListingEnums';

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
    country: string;
    language: Language;
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
    invoiceCurrency?: Currency; 
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

