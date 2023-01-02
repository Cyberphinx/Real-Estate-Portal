import { Location } from './../Location';
import { CompanyAddress, CompanyContacts, RedressScheme } from "../Company";
import { Currency, Frequency, MediaType, PriceQualifier, TransactionType, UnitOfArea, UnitOfLength } from "./ListingEnums";

export interface Content {
    id: string;
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
    price: number;
    pricePerUnitArea: number;
    rentFrequency: Frequency;
    priceQualifier: PriceQualifier;
    auction: boolean;
    areaUnits: UnitOfArea;
}

export interface ServiceCharge {
    id: string;
    charge: number;
    perUnitAreaUnits: UnitOfArea;
    frequency: Frequency;
}

export interface WatcherDto {
    displayName: string;
    description: string;
    username: string;
    addedOn: Date;
}