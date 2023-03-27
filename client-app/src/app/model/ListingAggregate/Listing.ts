import { AccessStatus } from "../AccessStatus";
import { UnitOfTime } from "../Membership";
import {
    Category, CentralHeating, CookerType, CouncilTaxBand, DecorativeCondition, 
    Eligibility, FurnishedState, 
    LifeCycleStatus, ListedBuildingGrade, PropertyType, 
    RentalTerm, Tenure, UnitOfArea, TransactionType, Frequency, 
} from "./ListingEnums";
import { ChangeLog, DetailedDescription, KeyContact, ListingLocation, 
    ListingMediaDto, 
    Owner, Pricing, ServiceCharge, WatcherDto, } from "./ListingObjects";

export interface Listing {
    id: string;
    accessibility: boolean;
    accessStatus: AccessStatus;
    acreage: number;
    agency: string;
    addedOn: Date;
    administrationFees: string;
    annualBusinessRates: number;
    areaTotal: number;
    areaUnits: UnitOfArea;
    availableBedrooms: number;
    availableFromDate: Date;
    bathrooms: number;
    billsIncluded: string[];
    businessForSale: boolean;
    buyerIncentives: string[];
    company: Owner;
    companyId: string;
    category: Category;
    centralHeating: CentralHeating;
    chainFree: boolean;
    changeLogs: ChangeLog[];
    commercialUseClass: string[];
    commonholdDetails: string;
    connectedUtilities: string[];
    constructionYear: number;
    cookerType: CookerType;
    councilTaxBand: CouncilTaxBand;
    decorativeCondition: DecorativeCondition;
    deposit: number;
    detailedDescriptions: DetailedDescription[];
    eerCurrentRating: string;
    eerPotentialRating: string;
    eirCurrentRating: string;
    eirPotentialRating: string;
    featureProperty: boolean;
    featureList: string[];
    floorLevels: string[];
    floors: number;
    furnishedState: FurnishedState;
    groundRent: number;
    groundRentReviewPeriod: string;
    leaseExpiry: string;
    lastModified: Date;
    lifeCycleStatus: LifeCycleStatus;
    listedBuilding: boolean;
    listedBuildingGrade: ListedBuildingGrade;
    listingMedia: ListingMediaDto[];
    listingReference: string;
    listingLocation: ListingLocation;
    livingRooms: number;
    minimumContractLength: number;
    minimumContractLengthUnits: UnitOfTime;
    newBuild: boolean;
    openDay: Date;
    parking: boolean;
    petsAllowed: boolean;
    pricing: Pricing;
    propertyType: PropertyType;
    rateableValue: number;
    ratesPayable: number;
    rentalTerm: RentalTerm;
    repossession: boolean;
    retirement: boolean;
    sapRating: string;
    serviceCharge: ServiceCharge;
    serviced: boolean;
    sourceUri: string;
    sharedAccommodation: boolean;
    sharedOwnershipDetails: string;
    smokersConsidered: boolean;
    spiderTag: string;
    summaryDescription: string;
    tenanted: boolean;
    tenantEligibilityDss: Eligibility;
    tenantEligibilityStudents: Eligibility;
    tenure: Tenure;
    totalBedrooms: number;
    whiteGoods: string[];
    watchers: WatcherDto[];
    keyContacts: KeyContact[];
}

export class Listing implements Listing {
    constructor(initialValues?: ListingFormValues) {
        Object.assign(this, initialValues);
    }
}

export class ListingFormValues {
    id?: string = '';
    accessibility?: boolean = undefined;
    accessStatus: AccessStatus = AccessStatus.Public;
    acreage?: number;
    agency?: string;
    addedOn: Date = new Date();
    administrationFees?: string = '';
    annualBusinessRates?: number = undefined;
    areaTotal?: number = undefined;
    areaUnits: UnitOfArea = UnitOfArea.SqMetres;
    availableBedrooms?: number = undefined;
    availableFromDate?: Date = undefined;
    bathrooms?: number = undefined;
    billsIncluded?: string[] = [];
    businessForSale?: boolean = undefined;
    buyerIncentives?: string[] = [];
    category?: Category = Category.residential;
    centralHeating?: CentralHeating = undefined;
    chainFree: boolean = true;
    companyId: string = '';
    commercialUseClass?: string[] = [];
    commonholdDetails: string = ''
    connectedUtilities?: string[] = [];
    constructionYear?: number = undefined;
    cookerType?: CookerType = undefined;
    councilTaxBand?: CouncilTaxBand = undefined;
    decorativeCondition?: DecorativeCondition = undefined;
    deposit?: number = undefined;
    detailedDescriptions?: DetailedDescription[] = [];
    eerCurrentRating?: string = '';
    eerPotentialRating?: string = '';
    eirCurrentRating?: string = '';
    eirPotentialRating?: string = '';
    featureProperty?: boolean = false;
    featureList?: string[] = [];
    floorLevels?: string[] = [];
    floors?: number = undefined;
    furnishedState?: FurnishedState = undefined;
    groundRent?: number = undefined;
    groundRentReviewPeriod?: string = '';
    leaseExpiry?: string = '';
    lifeCycleStatus?: LifeCycleStatus = undefined;
    listedBuilding?: boolean = false;
    listedBuildingGrade?: ListedBuildingGrade = undefined;
    listingMedia: ListingMediaDto[] = [];
    listingReference?: string = '';
    listingLocation: ListingLocation = {
        id: '',
        displayAddress: '',
        propertyNumberOrName: '',
        streetName: '',
        locality: '',
        townOrCity: '',
        county: '',
        postalCode: '',
        country: 'United Kingdom',
        latitude: 51.505,
        longitude: -0.09,
    };
    livingRooms?: number = undefined;
    minimumContractLength?: number = undefined;
    minimumContractLengthUnits?: UnitOfTime = UnitOfTime.Months;
    newBuild?: boolean = undefined;
    openDay?: Date = undefined;
    parking?: boolean = true;
    petsAllowed?: boolean = undefined;
    pricing: Pricing = {
        id: '',
        transactionType: TransactionType.rent,
        currency: "gbp",
        price: undefined,
        pricePerUnitArea: undefined,
        rentFrequency: Frequency.perMonth,
        priceQualifier: "",
        auction: false,
        areaUnits: UnitOfArea.SqMetres
    };
    propertyType?: PropertyType = undefined;
    rateableValue?: number = undefined;
    ratesPayable?: number = undefined;
    rentalTerm?: RentalTerm = undefined;
    repossession?: boolean = undefined;
    retirement?: boolean = undefined;
    sapRating?: string = '';
    serviceCharge?: ServiceCharge = undefined;
    serviced?: boolean = undefined;
    sourceUri?: string;
    sharedAccommodation?: boolean = undefined;
    sharedOwnershipDetails?: string = '';
    smokersConsidered?: boolean = undefined;
    summaryDescription?: string = '';
    tenanted?: boolean = undefined;
    tenantEligibilityDss?: Eligibility = undefined;
    tenantEligibilityStudents?: Eligibility = undefined;
    tenure?: Tenure = 1;
    totalBedrooms?: number = undefined;
    whiteGoods?: string[] = [];

    constructor(listing?: ListingFormValues) {
        if (listing) {
            this.id = listing.id;
            this.accessibility = listing.accessibility;
            this.accessStatus = listing.accessStatus;
            this.acreage = listing.acreage;
            this.agency = listing.agency;
            this.addedOn = listing.addedOn;
            this.administrationFees = listing.administrationFees;
            this.annualBusinessRates = listing.annualBusinessRates;
            this.areaTotal = listing.areaTotal;
            this.areaUnits = listing.areaUnits;
            this.availableBedrooms = listing.availableBedrooms;
            this.availableFromDate = listing.availableFromDate;
            this.bathrooms = listing.bathrooms;
            this.billsIncluded = listing.billsIncluded;
            this.businessForSale = listing.businessForSale;
            this.buyerIncentives = listing.buyerIncentives;
            this.category = listing.category;
            this.centralHeating = listing.centralHeating;
            this.chainFree = listing.chainFree;
            this.companyId = listing.companyId;
            this.commercialUseClass = listing.commercialUseClass;
            this.commonholdDetails = listing.commonholdDetails;
            this.connectedUtilities = listing.connectedUtilities;
            this.constructionYear = listing.constructionYear;
            this.cookerType = listing.cookerType;
            this.councilTaxBand = listing.councilTaxBand;
            this.decorativeCondition = listing.decorativeCondition;
            this.deposit = listing.deposit;
            this.detailedDescriptions = listing.detailedDescriptions;
            this.eerCurrentRating = listing.eerCurrentRating;
            this.eerPotentialRating = listing.eerPotentialRating;
            this.eirCurrentRating = listing.eirCurrentRating;
            this.eirPotentialRating = listing.eirPotentialRating;
            this.featureProperty = listing.featureProperty;
            this.featureList = listing.featureList;
            this.floorLevels = listing.floorLevels;
            this.floors = listing.floors;
            this.furnishedState = listing.furnishedState;
            this.groundRent = listing.groundRent;
            this.groundRentReviewPeriod = listing.groundRentReviewPeriod;
            this.leaseExpiry = listing.leaseExpiry;
            this.lifeCycleStatus = listing.lifeCycleStatus;
            this.listedBuilding = listing.listedBuilding;
            this.listedBuildingGrade = listing.listedBuildingGrade;
            this.listingMedia = listing.listingMedia;
            this.listingReference = listing.listingReference;
            this.listingLocation = listing.listingLocation;
            this.livingRooms = listing.livingRooms;
            this.minimumContractLength = listing.minimumContractLength;
            this.minimumContractLengthUnits = listing.minimumContractLengthUnits;
            this.newBuild = listing.newBuild;
            this.openDay = listing.openDay;
            this.parking = listing.parking;
            this.petsAllowed = listing.petsAllowed;
            this.pricing = listing.pricing;
            this.propertyType = listing.propertyType;
            this.rateableValue = listing.rateableValue;
            this.ratesPayable = listing.ratesPayable;
            this.rentalTerm = listing.rentalTerm;
            this.repossession = listing.repossession;
            this.retirement = listing.retirement;
            this.sapRating = listing.sapRating;
            this.serviceCharge = listing.serviceCharge;
            this.serviced = listing.serviced;
            this.sourceUri = listing.sourceUri;
            this.sharedAccommodation = listing.sharedAccommodation;
            this.sharedOwnershipDetails = listing.sharedOwnershipDetails;
            this.smokersConsidered = listing.smokersConsidered;
            this.summaryDescription = listing.summaryDescription;
            this.tenanted = listing.tenanted;
            this.tenantEligibilityDss = listing.tenantEligibilityDss;
            this.tenantEligibilityStudents = listing.tenantEligibilityStudents;
            this.tenure = listing.tenure;
            this.totalBedrooms = listing.totalBedrooms;
            this.whiteGoods = listing.whiteGoods;
        }
    }
}



