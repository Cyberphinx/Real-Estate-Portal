import { CompanyAddress } from './Company';
import { Membership } from './Membership';
import { AccessStatus } from './AccessStatus';
import { ServiceCategory } from './ServiceCategory';
import { Review } from "./Review";
import { JobLifeCycle, JobNetworkRole } from './Job';
import { Currency, Frequency, LifeCycleStatus, PriceQualifier, TransactionType } from './ListingAggregate/ListingEnums';
import { Country } from './Location';
import { PaymentStatus } from './PaymentStatus';

export interface Profile {
    username: string;
    displayName: string;
    description: string;
    country: Country;
    image: string;
    photos: Photo[];
    membership: Membership;
    reviews: AppUserReview[];
    invoices: Invoice[];
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface AppUserReview extends Review {
    id: string;
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
    transactionType: TransactionType;
    image: string;
    lifeCycleStatus: LifeCycleStatus;
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
    companyAddress: CompanyAddress;
}

export interface Invoice {
    id?: string;
    amount: number;
    currency: Currency;
    description: string;
    invoiceDate: Date;
    invoiceNumber: number;
    items: InvoiceItem[];
    paymentStatus: PaymentStatus;
    title: string;
    vatPercentage: number;
    paymentIntentId?: string;
    clientSecret?: string;
}

export interface InvoiceItem {
    id?: string;
    amount: number;
    currency: Currency;
    description: string;
    title: string;
    vatPercentage: number;
}