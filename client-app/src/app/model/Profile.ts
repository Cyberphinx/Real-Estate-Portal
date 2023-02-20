import { CompanyAddress } from './Company';
import { Membership } from './Membership';
import { AccessStatus } from './AccessStatus';
import { Review } from "./Review";
import { JobLifeCycle, JobNetworkRole } from './Job';
import { Frequency, LifeCycleStatus, PriceQualifier, TransactionType } from './ListingAggregate/ListingEnums';
import { MediaType } from './Media';
import { Invoice } from './Invoice';

export interface Profile {
    username: string;
    displayName: string;
    description: string;
    country: string;
    image: string;
    photos: PhotoDto[];
    membership: Membership;
    reviews: AppUserReview[];
    invoices: Invoice[];
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
    companyReference: string;
    displayName: string;
    isMain: boolean;
    legalName: string;
    listingsCount: number;
    summaryDescription: string;
    username: string;
    companyAddress: CompanyAddress;
}

