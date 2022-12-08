import { Company } from "./Company";

export interface CompanyContent {
    id: string;
    url: string;
    type: CompanyMediaType;
    caption: string;
    companyId: string;
    company: Company;
}

export enum CompanyMediaType {
    Audio,
    Brochure,
    Document,
    Image,
    Video
}