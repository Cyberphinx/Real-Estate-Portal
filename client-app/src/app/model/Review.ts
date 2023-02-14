export interface Review {
    reviewerDisplayName: string;
    reviewerUsername: string;
    reviewerEmail: string;
    reviewerPhone: string;
    addedOn: Date;
    serviceCategories: string[];
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