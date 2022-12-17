import { ServiceCategory } from './ServiceCategory';

export interface Review {
    reviewerDisplayName: string;
    reviewerUsername: string;
    reviewerEmail: string;
    reviewerPhone: string;
    addedOn: Date;
    serviceCategories: ServiceCategory[];
    title: string;
    description: string;
    reviewStatus: ReviewStatus;
}

export enum ReviewStatus {
    PositiveReview,
    NeutralReview,
    NegativeReview,
    WaitingForReview,
    ReferenceReview
}