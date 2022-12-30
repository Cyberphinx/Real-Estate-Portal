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

export interface UserFormValues {
    displayName?: string;
    email: string;
    password: string;
    username?: string;
    phoneNumber?: string;
    accountType?: AccountType;
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

