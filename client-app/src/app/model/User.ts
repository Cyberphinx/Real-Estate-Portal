import { Membership } from "./Membership";

export interface User {
    username: string;
    token: string;
    image?: string;
    email: string;
    role: string[];
    companyName: string;
    companyPostalCode: string;
    redressScheme: RedressScheme;
    membership: Membership;
    lastLoginTime: Date;
    registrationDate: Date;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    agency?: boolean;
    companyName?: string;
    companyPostalCode?: string;
}

export interface RoleFormValues {
    username: string;
    role: string;
}

export enum RedressScheme {
    ThePropertyOmbudsman,
    ThePropertyRedressScheme,
    ScottishLettingAgentRegister,
    PropertyServicesRegulatoryAuthorityIreland, 
    Other
}

