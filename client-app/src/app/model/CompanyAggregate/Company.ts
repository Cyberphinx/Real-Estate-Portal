import { RedressScheme } from './../User';
import { Listing } from './../ListingAggregate/Listing';
import { AccessStatus } from './../AccessStatus';
import { Order } from '../OrderAggregate/Order';
import { Availability } from '../Availability';
import { CompanyDetails } from './CompanyDetails';
import { Insurance } from './Insurance';
import { ServiceCategory } from '../ServiceCategory';
import { Membership } from '../Membership';
import { Location } from '../LocationAggregate/Location';
import { Contacts } from '../Contacts';
import { CompanyContent } from './CompanyContent';

export interface Company {
    id: string;
    accessStatus: AccessStatus;
    addedOn: Date;
    availabilities: Availability[];
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    companyContents: CompanyContent[];
    companyDetails: CompanyDetails;
    companyDescriptions: CompanyDescription;
    companyName: string;
    companyReference: string;
    insurances: Insurance[];
    listings: Listing[];
    logo: string;
    membership: Membership;
    orders: Order[];
    redressScheme: RedressScheme;
    serviceCategory: ServiceCategory;
    serviceLocations: string;
    serviceScope: string;
    summaryDescription: string;
    usernames: string[];
}

export class Company implements Company {
    constructor(initialValues?: CompanyFormValues) {
        Object.assign(this, initialValues);
    }
}

export class CompanyFormValues {
    id?: string;
    accessStatus: AccessStatus = AccessStatus.Private;
    addedOn: Date = new Date();
    availabilities?: Availability[];
    companyAddress?: CompanyAddress;
    companyContacts?: CompanyContacts;
    companyContents?: CompanyContent[];
    companyDescription?: CompanyDescription;
    companyDetails?: CompanyDetails;
    companyName: string = "";
    companyReference: string = "";
    displayName: string = "";
    insurances?: Insurance[];
    listings?: Listing[];
    logo?: string;
    membership?: Membership;
    orders?: Order[];
    redressScheme?: RedressScheme = 0;
    serviceCategory: ServiceCategory = ServiceCategory.EstateAgent;
    serviceLocations?: string;
    serviceScope?: string;
    usernames: string[] = [];

    constructor(company?: CompanyFormValues) {
        if (company) {
            this.id = company.id;
            this.accessStatus = company.accessStatus;
            this.addedOn = company.addedOn;
            this.availabilities = company.availabilities;
            this.companyAddress = company.companyAddress;
            this.companyContacts = company.companyContacts;
            this.companyContents = company.companyContents;
            this.companyDescription = company.companyDescription;
            this.companyDetails = company.companyDetails;
            this.companyName = company.companyName;
            this.companyReference = company.companyReference;
            this.displayName = company.displayName;
            this.insurances = company.insurances;
            this.listings = company.listings;
            this.logo = company.logo;
            this.membership = company.membership;
            this.redressScheme = company.redressScheme;
            this.serviceCategory = company.serviceCategory;
            this.serviceLocations = company.serviceLocations;
            this.serviceScope = company.serviceScope;
            this.usernames = company.usernames;
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