export enum FeatureParams {
    Garden,
    Parking,
    Balcony,
    VirtualTour
}

export interface PredicateFormValues {
    predicate: string;
    value: string | Date;
}