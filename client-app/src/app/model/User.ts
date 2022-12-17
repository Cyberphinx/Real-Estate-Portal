export interface User {
    displayName: string;
    token: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string[];
    image?: string;
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



