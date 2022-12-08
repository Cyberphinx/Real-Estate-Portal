import { Listing } from "../Listing";

export interface Areas {
    id: string;
    external: Area;
    internal: Area;
    listingId: string;
    listing: Listing;
}

export interface Area {
    value: number;
    units: UnitOfArea;
}

export enum UnitOfArea {
    SqFeet,
    SqYard,
    SqMetres,
    Acres,
    Hectares
}