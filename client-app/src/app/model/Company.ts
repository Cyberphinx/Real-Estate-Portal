import { Media } from './Media';
import { ListingLocation, Pricing } from './ListingAggregate/ListingObjects';
import { LifeCycleStatus, PropertyType } from './ListingAggregate/ListingEnums';
import { Review } from './Review';
import { AccessStatus } from './AccessStatus';
import { ServiceCategory } from './ServiceCategory';
import { Location } from './Location';
import { Contacts } from './Contacts';

export interface Company {
    id: string;
    accessStatus: AccessStatus;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    companyMedia: Media[];
    companyDescriptions: CompanyDescription[];
    companyReference: string;
    companyRegistrationNumber: string;
    companyType: CompanyType;
    displayName: string;
    icoRegistrationNumber: string;
    insurances: Insurance[];
    isMain: boolean;
    lastMofidied: Date;
    legalName: string;
    listings: Stock[];
    redressScheme: RedressScheme;
    reviews: CompanyReview[];
    serviceLocations: string;
    summaryDescription: string;
    serviceCategories: ServiceCategory[];
    username: string;
}

export class Company implements Company {
    constructor(initialValues?: CompanyFormValues) {
        Object.assign(this, initialValues);
    }
}

export class CompanyFormValues {
    id?: string;
    accessStatus: AccessStatus = AccessStatus.Public;
    addedOn: Date = new Date();
    companyAddress?: CompanyAddress;
    companyContacts?: CompanyContacts;
    companyMedia?: Media[];
    companyDescriptions?: CompanyDescription[];
    companyReference: string = "";
    companyRegistrationNumber: string = "";
    companyType?: CompanyType;
    displayName: string = "";
    icoRegistrationNumber?: string;
    insurances?: Insurance[];
    isMain: boolean =  false;
    lastModified: Date = new Date();
    legalName: string = "";
    listings?: Stock[];
    redressScheme?: RedressScheme;
    reviews?: CompanyReview[];
    serviceLocations?: string;
    summaryDescription: string = "";
    serviceCategories: ServiceCategory[] = [];
    username: string = "";

    constructor(company?: CompanyFormValues) {
        if (company) {
            this.id = company.id;
            this.accessStatus = company.accessStatus;
            this.addedOn = company.addedOn;
            this.companyAddress = company.companyAddress;
            this.companyContacts = company.companyContacts;
            this.companyMedia = company.companyMedia;
            this.companyDescriptions = company.companyDescriptions;
            this.companyReference = company.companyReference;
            this.companyRegistrationNumber = company.companyRegistrationNumber;
            this.companyType = company.companyType;
            this.displayName = company.displayName;
            this.icoRegistrationNumber = company.icoRegistrationNumber;
            this.insurances = company.insurances;
            this.isMain = company.isMain;
            this.lastModified = company.lastModified;
            this.legalName = company.legalName;
            this.listings = company.listings;
            this.redressScheme = company.redressScheme;
            this.reviews = company.reviews;
            this.serviceLocations = company.serviceLocations;
            this.summaryDescription = company.summaryDescription;
            this.serviceCategories = company.serviceCategories;
            this.username = company.username;
        }
    }
}

export interface CompanyAddress extends Location {
    id: string;
}

export interface CompanyContacts extends Contacts {
    id: string;
}

export interface CompanyDescription {
    id: string;
    heading: string;
    text: string;
}

export interface Insurance {
    id: string;
    type: InsuranceType;
    clientMoneyProtection: CmpScheme;
    provider: string;
    policyNumber: string;
    indemnityLimit: string;
    expiry: Date;
}

export enum InsuranceType {
    ProfessionalIndemnity,
    PublicLiability,
    ClientMoneyProtection
}

export enum CmpScheme {
    ClientMoneyProtect,
    MoneyShield,
    Propertymark,
    RICS,
    Safeagent,
    UKALA,
    LawSocietyOfScotland,
    CouncilOfLettingAgents,
    PICMPMint,
    Other
}

export interface Stock {
    id: string;
    addedOn: Date;
    accessStatus: AccessStatus;
    availableBedrooms: number;
    bathrooms: number;
    image: string;
    lifeCycleStatus: LifeCycleStatus;
    listingReference: string;
    listingLocation: ListingLocation;
    pricing: Pricing;
    propertyType:PropertyType;
    totalBedrooms: number;
    agency: string;
}

export enum RedressScheme {
    ThePropertyOmbudsman,
    ThePropertyRedressScheme,
    None
}

export interface CompanyReview extends Review {
    id: string;
}

export enum CompanyType {
    SoleTrader,
    LimitedCompany,
    Partnership,
    LimitedLiabilityPartnership
}