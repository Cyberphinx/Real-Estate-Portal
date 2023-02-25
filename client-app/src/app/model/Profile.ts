import { CompanyAddress, CompanyContacts, CompanyDescription, CompanyReview, CompanyType, Insurance } from './Company';
import { Membership } from './Membership';
import { AccessStatus } from './AccessStatus';
import { Review } from "./Review";
import { JobLifeCycle, JobNetworkRole } from './Job';
import { Frequency, LifeCycleStatus, PriceQualifier, TransactionType } from './ListingAggregate/ListingEnums';
import { Media, MediaType } from './Media';

export interface Profile {
    username: string;
    displayName: string;
    description: string;
    country: string;
    image: string;
    photos: PhotoDto[];
    membership: Membership;
    reviews: AppUserReview[];
}

export interface PhotoDto {
    id: string;
    index: number;
    url: string;
    type: MediaType;
    caption: string;
    isMain: boolean;
}

export interface AppUserReview extends Review {
    id: string;
}

export interface UserJobDto {
    id: string;
    addedOn: Date;
    title: string;
    jobReference: string;
    jobLifeCycle: JobLifeCycle;
    serviceCategories: string[];
    role: JobNetworkRole;
}

export interface WatcherListingDto {
    id: string;
    addedOn: Date;
    reference: string;
    transactionType: TransactionType;
    image: string;
    lifeCycleStatus: LifeCycleStatus;
    price: number;
    priceQualifier: PriceQualifier;
    currency: string;
    rentFrequency: Frequency;
    city: string;
    postcode: string;
}

export interface UserCompanyDto {
    id: string;
    accessStatus: AccessStatus;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    companyMedia: Media[];
    companyDescriptions: CompanyDescription[];
    companyReference: string;
    companyRegistrationNumber: string;
    companyType: string;
    displayName: string;
    icoRegistrationNumber: string;
    insurances: Insurance[];
    isMain: boolean;
    lastMofidied: Date;
    legalName: string;
    listingsCount: number;
    redressScheme: string;
    reviews: CompanyReview[];
    serviceLocations: string;
    summaryDescription: string;
    serviceCategories: string[];
    termsAndConditions: string;
    username: string;
    vatNumber: string;
}

