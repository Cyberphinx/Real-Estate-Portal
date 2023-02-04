import { Location } from './Location';
import { MediaType } from './Media';
import { Message } from './Message';
import { ServiceCategory } from './ServiceCategory';

export enum JobLifeCycle {
    Open,
    Cancelled,
    Completed
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
    ShortlistedCompany
}

export interface Job {
    id: string;
    addedOn: Date;
    finishBy: Date;
    serviceCategories: ServiceCategory[];
    title: string;
    description: string;
    jobLifeCycle: JobLifeCycle;
    jobMedia: JobMediaDto[];
    jobLocation: JobLocation;
    networks: NetworkDto[];
    messages: Message[];
}


export class Job implements Job {
    constructor(initialValues?: JobFormValues) {
        Object.assign(this, initialValues);
    }
}

export class JobFormValues {
    id?: string;
    addedOn: Date = new Date();
    finishBy?: Date;
    serviceCategories: ServiceCategory[] = [];
    title: string = "";
    description: string = "";
    jobLifeCycle: JobLifeCycle = JobLifeCycle.Open;
    jobMedia?: JobMediaDto[];
    jobLocation?: JobLocation;
    networks?: NetworkDto[];
    messages?: Message[];

    constructor(job?: Job) {
        if (job) {
            this.id = job.id;
            this.addedOn = job.addedOn;
            this.finishBy = job.finishBy;
            this.serviceCategories = job.serviceCategories;
            this.title = job.title;
            this.description = job.description;
            this.jobLifeCycle = job.jobLifeCycle;
            this.jobMedia = job.jobMedia;
            this.jobLocation = job.jobLocation;
            this.networks = job.networks;
            this.messages = job.messages
        }
    }
}







