import { Location } from './Location';
import { MediaType } from './Media';
import { Message } from './Message';
import { v4 as uuid } from 'uuid';

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
    jobId: string;
}

export interface JobLocation extends Location {
    id: string;
    addressType: string;
    index: number;
}

export interface NetworkDto {
    displayName: string;
    description: string;
    image: string;
    jobsCount: number;
    reviewsCount: number;
    username: string;
    role: JobNetworkRole;
    phone: string;
    email: string;
}

export enum JobNetworkRole {
    Customer,
    InterestedCompany,
    ShortlistedCompany,
    Finalist
}

export interface Job {
    id: string;
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerImage: string,
    addedOn: Date;
    finishBy: Date;
    serviceCategories: string[];
    title: string;
    description: string;
    jobReference: string;
    jobLifeCycle: JobLifeCycle;
    jobMedia: JobMediaDto[];
    jobLocations: JobLocation[];
    networks: NetworkDto[];
    messages: Message[];
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
    commercial: boolean;
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
    customerImage?: string = '';
    addedOn: Date = new Date();
    finishBy?: Date = undefined;
    serviceCategories: string[] = [];
    title: string = '';
    description: string = '';
    jobReference: string = '';
    jobLifeCycle: JobLifeCycle = JobLifeCycle.Open;
    jobMedia?: JobMediaDto[] = [];
    jobLocations?: JobLocation[] = [];
    networks?: NetworkDto[] = [];
    messages?: Message[] = [];
    bedrooms?: number = undefined;
    bathrooms?: number = undefined;
    propertyType?: string = '';
    commercial?: boolean = false;
    declaredValue?: string = '';
    storageRequired?: boolean = undefined;
    storageValue?: string = '';
    packingRequired?: boolean = undefined;

    constructor(job?: JobFormValues) {
        if (job) {
            this.id = job.id;
            this.customerName = job.customerName;
            this.customerEmail = job.customerEmail;
            this.customerPhone = job.customerPhone;
            this.customerImage = job.customerImage;
            this.addedOn = job.addedOn;
            this.finishBy = job.finishBy;
            this.serviceCategories = job.serviceCategories;
            this.title = job.title;
            this.description = job.description;
            this.jobReference = job.jobReference;
            this.jobLifeCycle = job.jobLifeCycle;
            this.jobMedia = job.jobMedia;
            this.jobLocations = job.jobLocations;
            this.networks = job.networks;
            this.messages = job.messages;
            this.bedrooms = job.bedrooms;
            this.bathrooms = job.bathrooms;
            this.propertyType = job.propertyType;
            this.commercial = job.commercial;
            this.declaredValue = job.declaredValue;
            this.storageRequired = job.storageRequired;
            this.storageValue = job.storageValue;
            this.packingRequired = job.packingRequired;
        }
    }
}







