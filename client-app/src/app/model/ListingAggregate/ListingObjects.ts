import { CompanyAddress, CompanyContacts, RedressScheme } from "../Company";
import { Currency, Frequency, MediaType, PriceQualifier, TransactionType, UnitOfArea, UnitOfLength } from "./ListingEnums";

export interface Content {
    id: number;
    url: string;
    type: MediaType;
    caption: string;
    isMain: boolean;
}

export interface DetailedDescription {
    id: number;
    heading: string;
    text: string;
    length: number;
    width: number;
    unit: UnitOfLength;
    area: number;
}

export interface EpcRatings {
    id: number;
    eerCurrentRating: number;
    eerPotentialRating: number;
    eirCurrentRating: number;
    eirPotentialRating: number;
}

export interface ListingLocation extends Location {
    id: number;
}

export interface Owner {
    id: string;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    LegalName: string;
    companyReference: string;
    displayName: string;
    redressSchemes: RedressScheme[];
    summaryDescription: string;
}

export interface Pricing {
    id: number;
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
    id: number;
    charge: number;
    perUnitAreaUnits: UnitOfArea;
    frequency: Frequency;
}

export interface WatcherDto {
    displayName: string;
    description: string;
    username: string;
}