import { Listing } from './../Listing';

export interface DetailedDescription {
    id: string;
    index: number;
    heading: string;
    dimensions: Dimensions;
    text: string;
    listingId: string;
    listing: Listing;
}

export interface Dimensions {
    length: number;
    width: number;
    unit: UnitOfLength;
    area: number;
}

export enum UnitOfLength {
    feet,
    metres
}