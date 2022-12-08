import { Listing } from "../Listing";

export interface Content {
    id: string;
    index: number;
    url: string;
    type: MediaType;
    caption: string;
    listingId: string;
    listing: Listing;
}

export enum MediaType {
    audioTour,
    brochure,
    document,
    epcGraph,
    epcReport,
    floorPlan,
    homePack,
    image,
    sitePlan,
    virtualTour
}