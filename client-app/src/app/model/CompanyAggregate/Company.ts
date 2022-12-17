import { Review } from './../Review';
import { Listing } from './../ListingAggregate/Listing';
import { AccessStatus } from './../AccessStatus';
import { Insurance } from './Insurance';
import { ServiceCategory } from '../ServiceCategory';
import { Membership } from '../Membership';
import { Location } from '../Location';
import { Contacts } from '../Contacts';
import { Job } from '../JobAggregate/Job';

export interface Company {
    id: string;
    accessStatus: AccessStatus;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    companyContents: CompanyContent[];
    companyDescriptions: CompanyDescription[];
    companyReference: string;
    companyRegistrationNumber: string;
    displayName: string;
    insurances: Insurance[];
    lastMofidied: Date;
    legalName: string;
    listings: Listing[];
    membership: Membership;
    jobs: Job[];
    redressSchemes: RedressScheme[];
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
    companyContents?: CompanyContent[];
    companyDescriptions?: CompanyDescription[];
    companyReference: string = "";
    companyRegistrationNumber: string = "";
    displayName: string = "";
    insurances?: Insurance[];
    lastModified: Date = new Date();
    legalName: string = "";
    listings?: Listing[];
    membership?: Membership;
    jobs?: Job[];
    redressSchemes?: RedressScheme[] = [];
    serviceCategories: ServiceCategory[] = [];
    serviceLocations?: string;
    serviceScope?: string;
    username: string = "";

    constructor(company?: CompanyFormValues) {
        if (company) {
            this.id = company.id;
            this.accessStatus = company.accessStatus;
            this.addedOn = company.addedOn;
            this.companyAddress = company.companyAddress;
            this.companyContacts = company.companyContacts;
            this.companyContents = company.companyContents;
            this.companyDescriptions = company.companyDescriptions;
            this.companyReference = company.companyReference;
            this.companyRegistrationNumber = company.companyRegistrationNumber;
            this.displayName = company.displayName;
            this.insurances = company.insurances;
            this.lastModified = company.lastModified;
            this.legalName = company.legalName;
            this.listings = company.listings;
            this.membership = company.membership;
            this.jobs = company.jobs;
            this.redressSchemes = company.redressSchemes;
            this.serviceCategories = company.serviceCategories;
            this.serviceLocations = company.serviceLocations;
            this.serviceScope = company.serviceScope;
            this.username = company.username;
        }
    }
}

export interface CompanyAddress extends Location {

}

export interface CompanyContacts extends Contacts {

}

export interface CompanyDescription {
    id: string;
    heading: string;
    text: string;
    companyId: string;
    company: Company;
}

export enum RedressScheme {
    ThePropertyOmbudsman,
    ThePropertyRedressScheme,
    ScottishLettingAgentRegister,
    PropertyServicesRegulatoryAuthorityIreland, 
    Other
}

export interface CompanyContent {
    id: string;
    url: string;
    type: CompanyMediaType;
    caption: string;
    companyId: string;
    company: Company;
}

export enum CompanyMediaType {
    Audio,
    Brochure,
    Document,
    Image,
    Video
}

export interface CompanyReview extends Review {
    id: number;
}