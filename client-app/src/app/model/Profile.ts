import { ServiceCategory } from './ServiceCategory';
import { Review } from "./Review";
import { JobLifeCycle, JobNetworkRole } from './Job';

export interface Profile {
    username: string;
    displayName: string;
    description: string;
    image: string;
    photos: Photo[];
    reviews: AppUserReview[];
    jobs: UserJobDto[];
    savedListings: WatcherListingDto[];
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface AppUserReview extends Review {
    id: number;
}

export interface UserJobDto {
    id: string;
    addedOn: Date;
    title: string;
    jobLifeCycle: JobLifeCycle;
    serviceCategories: ServiceCategory[];
    role: JobNetworkRole;
}

export interface WatcherListingDto {
    listingReference: string;
    listingImage: string;
    listingPrice: string;
    listingCity: string;
    listingPostcode: string;
}