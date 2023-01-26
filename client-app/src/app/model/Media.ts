export interface Media {
    id: string;
    index: number;
    url: string;
    type: MediaType;
    caption: string;
    isMain: boolean;
    isLogo: boolean;
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