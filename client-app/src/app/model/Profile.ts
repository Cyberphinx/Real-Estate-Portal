import { AccessStatus } from './AccessStatus';
import { ServiceCategory } from './ServiceCategory';
import { Review } from "./Review";
import { JobLifeCycle, JobNetworkRole } from './Job';
import { Currency, Frequency, PriceQualifier, TransactionType } from './ListingAggregate/ListingEnums';
import { Country } from './Location';

export interface Profile {
    username: string;
    displayName: string;
    description: string;
    country: Country;
    image: string;
    photos: Photo[];
    reviews: AppUserReview[];
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface AppUserReview extends Review {
    id: number;
}

export interface UserJobDto {
    id: string;
    addedOn: Date;
    title: string;
    jobLifeCycle: JobLifeCycle;
    serviceCategories: ServiceCategory[];
    role: JobNetworkRole;
}

export interface WatcherListingDto {
    id: string;
    addedOn: Date;
    reference: string;
    image: string;
    transactionType: TransactionType;
    price: number;
    priceQualifier: PriceQualifier;
    currency: Currency;
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
}