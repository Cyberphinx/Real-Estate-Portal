import { CompanyAddress, CompanyContacts, CompanyContent, CompanyDescription, RedressScheme } from './../../CompanyAggregate/Company';
import { Insurance } from '../../CompanyAggregate/Insurance';
import { ServiceCategory } from '../../ServiceCategory';

export interface Owner {
    id: string;
    addedOn: Date;
    companyAddress: CompanyAddress;
    companyContacts: CompanyContacts;
    companyContents: CompanyContent;
    companyDescriptions: CompanyDescription;
    LegalName: string;
    companyReference: string;
    displayName: string;
    insurances: Insurance[];
    redressSchemes: RedressScheme[];
    serviceLocations: string;
    summaryDescription: string;
    serviceCategories: ServiceCategory[];
    listingsCount: number;
}