import { Location } from './Location';
import { MediaType } from './Media';
import { Message } from './Message';

export enum JobLifeCycle {
    Open,
    InProgress,
    Cancelled,
    Completed,
    Paid,
    InDispute,
    Refunded
}

export interface JobMediaDto {
    id: string;
    index: number;
    url: string;
    type: MediaType;
    caption: string;
    isMain: boolean;
}

export interface JobLocation extends Location {
    id: string;
    addressType: string;
}

export interface NetworkDto {
    displayName: string;
    description: string;
    image: string;
    jobsCount: number;
    reviewsCount: number;
    username: string;
    role: JobNetworkRole;
}

export enum JobNetworkRole {
    Customer,
    InterestedCompany,
    ShortlistedCompany,
    Finalist
}

export interface Job {
    id: string;
    username: string;
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    addedOn: Date;
    finishBy: Date;
    serviceCategories: string[];
    title: string;
    description: string;
    jobLifeCycle: JobLifeCycle;
    jobMedia: JobMediaDto[];
    jobLocations: JobLocation[];
    networks: NetworkDto[];
    messages: Message[];
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
    declaredValue: string;
    storageRequired: boolean;
    storageValue: string;
    packingRequired: boolean;
}


export class Job implements Job {
    constructor(initialValues?: JobFormValues) {
        Object.assign(this, initialValues);
    }
}

export class JobFormValues {
    id?: string = '';
    customerName?: string = '';
    customerEmail?: string = '';
    customerPhone?: string = '';
    addedOn: Date = new Date();
    finishBy?: Date = undefined;
    serviceCategories: string[] = [];
    title: string = "";
    description: string = "";
    jobLifeCycle: JobLifeCycle = JobLifeCycle.Open;
    jobMedia?: JobMediaDto[] = [];
    jobLocations?: JobLocation[] = [];
    networks?: NetworkDto[] = [];
    messages?: Message[] = [];
    bedrooms?: number = undefined;
    bathrooms?: number = undefined;
    propertyType?: string = '';
    declaredValue?: string = '';
    storageRequired?: boolean = undefined;
    storageValue?: string = '';
    packingRequired?: boolean = undefined;

    constructor(job?: Job) {
        if (job) {
            this.id = job.id;
            this.customerName = job.customerName;
            this.customerEmail = job.customerEmail;
            this.customerPhone = job.customerPhone;
            this.addedOn = job.addedOn;
            this.finishBy = job.finishBy;
            this.serviceCategories = job.serviceCategories;
            this.title = job.title;
            this.description = job.description;
            this.jobLifeCycle = job.jobLifeCycle;
            this.jobMedia = job.jobMedia;
            this.jobLocations = job.jobLocations;
            this.networks = job.networks;
            this.messages = job.messages;
            this.bedrooms = job.bedrooms;
            this.bathrooms = job.bathrooms;
            this.propertyType = job.propertyType;
            this.declaredValue = job.declaredValue;
            this.storageRequired = job.storageRequired;
            this.storageValue = job.storageValue;
            this.packingRequired = job.packingRequired;
        }
    }
}







