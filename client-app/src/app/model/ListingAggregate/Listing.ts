import { AccessStatus } from "../AccessStatus";
import { UnitOfTime } from "../Membership";
import {
    Category, CentralHeating, CookerType, CouncilTaxBand, DecorativeCondition, Eligibility, FurnishedState, Incentive,
    LifeCycleStatus, ListedBuildingGrade, OutsideSpace, Parking, PropertyType, RentalTerm, Tenure, Utility, UnitOfArea
} from "./ListingEnums";
import { Content, DetailedDescription, EpcRatings, ListingLocation, Owner, Pricing, ServiceCharge, WatcherDto, } from "./ListingObjects";

export interface Listing {
    id: string;
    accessibility: boolean;
    addedOn: Date;
    administrationFees: string;
    annualBusinessRates: number;
    areaTotal: number;
    areaUnits: UnitOfArea;
    accessStatus: AccessStatus;
    availableBedrooms: number;
    availableFromDate: Date;
    basement: boolean;
    bathrooms: number;
    billsIncluded: Utility[];
    burglarAlarm: boolean;
    businessForSale: boolean;
    buyerIncentives: Incentive[];
    company: Owner;
    companyReference: string;
    category: Category;
    centralHeating: CentralHeating;
    chainFree: boolean;
    commercialUseClass: string[];
    connectedUtilities: Utility[];
    conservatory: boolean;
    constructionYear: number;
    contents: Content[];
    cookerType: CookerType;
    councilTaxBand: CouncilTaxBand;
    decorativeCondition: DecorativeCondition;
    deposit: number;
    detailedDescriptions: DetailedDescription[];
    doubleGlazing: boolean;
    dishwasher: boolean;
    epcRatings: EpcRatings;
    featureProperty: boolean;
    featureList: string[];
    fireplace: boolean;
    fishingRights: boolean;
    floorLevels: number[];
    floors: number;
    furnishedState: FurnishedState;
    freezer: boolean;
    fridge: boolean;
    groundRent: number;
    gym: boolean;
    leaseExpiry: string;
    lifeCycleStatus: LifeCycleStatus;
    listedBuildingGrade: ListedBuildingGrade;
    listingReference: string;
    listingLocation: ListingLocation;
    livingRooms: number;
    loft: boolean;
    minimumContractLength: number;
    minimumContractLengthUnits: UnitOfTime;
    newBuild: boolean;
    openDay: Date;
    outbiuldings: boolean;
    outsideSpaces: OutsideSpace[];
    parking: Parking[];
    petsAllowed: boolean;
    porterSecurity: boolean;
    pricing: Pricing;
    propertyType: PropertyType;
    rateableValue: number;
    rentalTerm: RentalTerm;
    repossession: boolean;
    retirement: boolean;
    sapRating: number;
    serviceCharge: ServiceCharge;
    serviced: boolean;
    sharedAccommodation: boolean;
    smokersConsidered: boolean;
    summaryDescription: string;
    swimmingPool: boolean;
    tenanted: boolean;
    tenantEligibilityDss: Eligibility;
    tenantEligibilityStudents: Eligibility;
    tennisCourt: boolean;
    tenure: Tenure;
    totalBedrooms: number;
    utilityRoom: boolean;
    waterFront: boolean;
    washingMachine: boolean;
    woodFloors: boolean;
    watchers: WatcherDto[];
}

export class Listing implements Listing {
    constructor(initialValues?: ListingFormValues) {
        Object.assign(this, initialValues);
    }
}

export class ListingFormValues {
    id?: string = '';
    accessibility?: boolean = undefined;
    addedOn: Date = new Date();
    administrationFees?: string = '';
    annualBusinessRates?: number = undefined;
    areasTotal?: number = undefined;
    areasUnits?: UnitOfArea = UnitOfArea.SqMetres;
    accessStatus: AccessStatus = AccessStatus.Private;
    availableBedrooms?: number = undefined;
    availableFromDate?: Date = undefined;
    basement?: boolean = undefined;
    bathrooms?: number = undefined;
    billsIncluded?: Utility[] = [];
    company?: Owner = {
        id: '',
        addedOn: new Date(),
        companyAddress: {
            id: '',
            displayAddress: '',
            propertyNumberOrName: '',
            streetName: '',
            locality: '',
            townOrCity: '',
            county: '',
            postalCode: '',
            country: '',
            latitude: 51.505,
            longitude: -0.09,
        },
        companyContacts: {
            id: '',
            phone: '',
            email: '',
            website: ''
        },
        LegalName: '',
        companyReference: '',
        displayName: '',
        summaryDescription: '',
        logo: '',
    };
    companyReference: string = '';
    burglarAlarm?: boolean = undefined;
    businessForSale?: boolean = undefined;
    buyerIncentives?: Incentive[] = [];
    category?: Category = Category.residential;
    centralHeating?: CentralHeating = undefined;
    chainFree?: boolean = undefined;
    commercialUseClass?: string[] = [];
    connectedUtilities?: Utility[] = [];
    conservatory?: boolean = undefined;
    constructionYear?: number = undefined;
    contents?: Content[] = [];
    cookerType?: CookerType = undefined;
    councilTaxBand?: CouncilTaxBand = undefined;
    decorativeCondition?: DecorativeCondition = undefined;
    deposit?: number = undefined;
    detailedDescriptions?: DetailedDescription[] = [];
    doubleGlazing?: boolean = undefined;
    epcRatings?: EpcRatings = undefined;
    featureList?: string[] = [];
    fireplace?: boolean = undefined;
    fishingRights?: boolean = undefined;
    floorLevels?: number[] = [];
    floors?: number = undefined;
    furnishedState?: FurnishedState = undefined;
    freezer?: boolean = undefined;
    fridge?: boolean = undefined;
    groundRent?: number = undefined;
    gym?: boolean = undefined;
    leaseExpiry?: string = '';
    lifeCycleStatus?: LifeCycleStatus = undefined;
    listedBuildingGrade?: ListedBuildingGrade = undefined;
    listingReference?: string = '';
    listingLocation?: ListingLocation = {
        id: '',
        displayAddress: '',
        propertyNumberOrName: '',
        streetName: '',
        locality: '',
        townOrCity: '',
        county: '',
        postalCode: '',
        country: '',
        latitude: 51.505,
        longitude: -0.09,
    };
    livingRooms?: number = undefined;
    loft?: boolean = undefined;
    minimumContractLength?: number = undefined;
    minimumContractLengthUnits?: UnitOfTime;
    newBuild?: boolean = undefined;
    openDay?: Date = undefined;
    outbiuldings?: boolean = undefined;
    outsideSpaces?: OutsideSpace[] = [];
    parking?: Parking[] = [];
    petsAllowed?: boolean = undefined;
    porterSecurity?: boolean = undefined;
    pricing?: Pricing = undefined;
    propertyType?: PropertyType = undefined;
    rateableValue?: number = undefined;
    rentalTerm?: RentalTerm = undefined;
    repossession?: boolean = undefined;
    retirement?: boolean = undefined;
    sapRating?: number = undefined;
    serviceCharge?: ServiceCharge = undefined;
    serviced?: boolean = undefined;
    sharedAccommodation?: boolean = undefined;
    summaryDescription?: string = '';
    swimmingPool?: boolean = undefined;
    tenanted?: boolean = undefined;
    tenantEligibilityDss?: Eligibility = undefined;
    tenantEligibilityStudents?: Eligibility = undefined;
    tennisCourt?: boolean = undefined;
    tenure?: Tenure = undefined;
    totalBedrooms?: number = undefined;
    utilityRoom?: boolean = undefined;
    waterFront?: boolean = undefined;
    woodFloors?: boolean = undefined;

    constructor(listing?: ListingFormValues) {
        if (listing) {
            this.id = listing.id;
            this.accessibility = listing.accessibility;
            this.addedOn = listing.addedOn;
            this.administrationFees = listing.administrationFees;
            this.annualBusinessRates = listing.annualBusinessRates;
            this.areasTotal = listing.areasTotal;
            this.accessStatus = listing.accessStatus;
            this.availableBedrooms = listing.availableBedrooms;
            this.availableFromDate = listing.availableFromDate;
            this.basement = listing.basement;
            this.bathrooms = listing.bathrooms;
            this.billsIncluded = listing.billsIncluded;
            this.company = listing.company;
            this.companyReference = listing.companyReference;
            this.burglarAlarm = listing.burglarAlarm;
            this.businessForSale = listing.businessForSale;
            this.buyerIncentives = listing.buyerIncentives;
            this.category = listing.category;
            this.centralHeating = listing.centralHeating;
            this.chainFree = listing.chainFree;
            this.commercialUseClass = listing.commercialUseClass;
            this.connectedUtilities = listing.connectedUtilities;
            this.conservatory = listing.conservatory;
            this.constructionYear = listing.constructionYear;
            this.contents = listing.contents;
            this.cookerType = listing.cookerType;
            this.councilTaxBand = listing.councilTaxBand;
            this.decorativeCondition = listing.decorativeCondition;
            this.deposit = listing.deposit;
            this.detailedDescriptions = listing.detailedDescriptions;
            this.doubleGlazing = listing.doubleGlazing;
            this.epcRatings = listing.epcRatings;
            this.featureList = listing.featureList;
            this.fireplace = listing.fireplace;
            this.fishingRights = listing.fishingRights;
            this.floorLevels = listing.floorLevels;
            this.floors = listing.floors;
            this.furnishedState = listing.furnishedState;
            this.freezer = listing.freezer;
            this.fridge = listing.fridge;
            this.groundRent = listing.groundRent;
            this.gym = listing.gym;
            this.leaseExpiry = listing.leaseExpiry;
            this.lifeCycleStatus = listing.lifeCycleStatus;
            this.listedBuildingGrade = listing.listedBuildingGrade;
            this.listingReference = listing.listingReference;
            this.listingLocation = listing.listingLocation;
            this.livingRooms = listing.livingRooms;
            this.loft = listing.loft;
            this.minimumContractLength = listing.minimumContractLength;
            this.newBuild = listing.newBuild;
            this.openDay = listing.openDay;
            this.outbiuldings = listing.outbiuldings;
            this.outsideSpaces = listing.outsideSpaces;
            this.parking = listing.parking;
            this.petsAllowed = listing.petsAllowed;
            this.porterSecurity = listing.porterSecurity;
            this.pricing = listing.pricing;
            this.propertyType = listing.propertyType;
            this.rateableValue = listing.rateableValue;
            this.rentalTerm = listing.rentalTerm;
            this.repossession = listing.repossession;
            this.retirement = listing.retirement;
            this.sapRating = listing.sapRating;
            this.serviceCharge = listing.serviceCharge;
            this.serviced = listing.serviced;
            this.sharedAccommodation = listing.sharedAccommodation;
            this.summaryDescription = listing.summaryDescription;
            this.swimmingPool = listing.swimmingPool;
            this.tenanted = listing.tenanted;
            this.tenantEligibilityDss = listing.tenantEligibilityDss;
            this.tenantEligibilityStudents = listing.tenantEligibilityStudents;
            this.tennisCourt = listing.tennisCourt;
            this.tenure = listing.tenure;
            this.totalBedrooms = listing.totalBedrooms;
            this.utilityRoom = listing.utilityRoom;
            this.waterFront = listing.waterFront;
            this.woodFloors = listing.woodFloors;
        }
    }
}



