import { string } from 'yup';
import { Location } from '../Location';
import { ServiceCategory } from '../ServiceCategory';
import { User } from '../User';
import { Invoice, InvoiceDto } from './Invoice';

export interface Job {
    id: string;
    addedOn: Date;
    finishBy: Date;
    serviceCategories: ServiceCategory[];
    title: string;
    description: string;
    jobLifeCycle: JobLifeCycle;
    jobContents: JobContent[];
    jobLocation: JobLocation;
    networks: NetworkDto[];
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
    jobContents?: JobContent[];
    jobLocation?: JobLocation;
    networks?: NetworkDto[];

    constructor(job?: Job) {
        if (job) {
            this.id = job.id;
            this.addedOn = job.addedOn;
            this.finishBy = job.finishBy;
            this.serviceCategories = job.serviceCategories;
            this.title = job.title;
            this.description = job.description;
            this.jobLifeCycle = job.jobLifeCycle;
            this.jobContents = job.jobContents;
            this.jobLocation = job.jobLocation;
            this.networks = job.networks;
        }
    }
}

export enum JobLifeCycle {
    Open,
    Cancelled,
    Completed
}

export interface JobContent {
    id: number;
    url: string;
    type: JobMediaType;
    caption: string;
    jobId: string;
    job: Job;
}

export enum JobMediaType {
    Audio,
    Image,
    Video
}

export interface JobLocation extends Location {

}

export interface JobNetwork {
    appUserId: string;
    appUser : User;
    jobId: string;
    job: Job;
    invoice: Invoice;
    role: JobNetworkRole;
}

export interface NetworkDto {
    displayName: string;
    description: string;
    image: string;
    invoice: InvoiceDto;
    jobsCount: number;
    reviewsCount: number;
    username: string;
    role: JobNetworkRole;
}

export enum JobNetworkRole {
    Customer,
    InterestedCompany,
    InvitedCompany,
    ShortlistedCompany
}