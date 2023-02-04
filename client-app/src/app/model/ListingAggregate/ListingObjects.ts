import { Location } from './../Location';
import { CompanyAddress, CompanyContacts, RedressScheme } from "../Company";
import { Currency, Frequency, PriceQualifier, TransactionType, UnitOfArea, UnitOfLength } from "./ListingEnums";
import { MediaType } from '../Media';

export interface ListingMediaDto {
    id: string;
    index: number;
    url: string;
    type: MediaType;
    caption: string;
    isMain: boolean;
}

export interface DetailedDescription {
    id: string;
    heading: string;
    text: string;
    length: number;
    width: number;
    unit: UnitOfLength;
    area: number;
    listingId: string;
}

export interface EpcRatings {
    id: string;
    eerCurrentRating: number;
    eerPotentialRating: number;
    eirCurrentRating: number;
    eirPotentialRating: number;
}

export interface ListingLocation extends Location {
    id: string;
}

export interface Owner {
    id: string;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    LegalName: string;
    companyReference: string;
    displayName: string;
    summaryDescription: string;
    logo: string;
}

export interface Pricing {
    id: string;
    transactionType: TransactionType;
    currency: Currency;
    price: number | undefined;
    pricePerUnitArea: number | undefined;
    rentFrequency: Frequency;
    priceQualifier: PriceQualifier;
    auction: boolean;
    areaUnits: UnitOfArea;
}

export interface ServiceCharge {
    id: string;
    applicable: boolean;
    charge: number;
    perUnitAreaUnits: UnitOfArea;
    reviewPeriod: string;
    frequency: Frequency;
}

export interface WatcherDto {
    displayName: string;
    description: string;
    username: string;
    addedOn: Date;
}