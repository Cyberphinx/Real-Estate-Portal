import { Listing } from "./Listing"

export enum Category {
    commercial,
    residential
}

export enum CentralHeating {
    full,
    partial,
    none
}

export enum CookerType {
    gas,
    electric,
    dualFuel
}

export enum CouncilTaxBand {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i
}

export enum Currency {
    aud,
    cny,
    eur,
    gbp,
    hkd,
    jpy,
    nok,
    nzd,
    sek,
    sgd,
    usd
}

export enum DecorativeCondition {
    excellent,
    good,
    average,
    needsModernisation
}

export enum Eligibility {
    aAccepted,
    excluded,
    only
}

export enum Frequency {
    perPersonPerWeek,
    perWeek,
    perMonth,
    perQuarter,
    perYear,
    notApplicable
}

export const rentFrequency = (listing: Listing) => {
    switch (listing.pricing.rentFrequency) {
        case 0:
            return "/person/week"
        case 1:
            return "/week"
        case 2:
            return "/month"
        case 3:
            return "/quarter"
        case 4:
            return "/year"
        case 5:
            return ""
        default:
            return ""
    }
}

export const rentFrequencyShort = (listing: Listing) => {
    switch (listing.pricing.rentFrequency) {
        case 0:
            return "/p/w"
        case 1:
            return "/w"
        case 2:
            return "/m"
        case 3:
            return "/q"
        case 4:
            return "/y"
        case 5:
            return ""
        default:
            return ""
    }
}

export enum FurnishedState {
    furnished,
    furnishedOrUnfurnished,
    partFurnished,
    unfurnished
}

export enum Incentive {
    equityLoan,
    helpToBuy,
    miNewHome,
    newBuy,
    partBuyPartRent,
    sharedEquity,
    sharedOwnership
}

export enum LifeCycleStatus {
    available,
    underOffer,
    soldSubjectToContract,
    sold,
    letAgreed,
    let
}

export enum ListedBuildingGrade {
    categoryA,
    categoryB,
    categoryC,
    gradeA,
    gradeB,
    gradeBPlus,
    gradeOne,
    gradeTwo,
    gradeTwoStar,
    locallyListed
}

export enum MediaType {
    audioTour,
    brochure,
    document,
    epcGraph,
    epcReport,
    floorPlan,
    homePack,
    image,
    sitePlan,
    virtualTour
}

export enum OutsideSpace {
    balcony,
    communalGarden,
    privateGarden,
    roofTerrace,
    terrace
}

export enum Parking {
    doubleGarage,
    offStreetParking,
    residentsParking,
    singleGarage,
    underground
}

export enum PriceQualifier {
    fixedPrice,
    from,
    guidePrice,
    nonQuoting,
    offersInTheRegionOf,
    offersOver,
    priceOnApplication,
    saleByTender
}

export const priceQualifier = (priceQualifier: PriceQualifier) => {
    switch (priceQualifier) {
        case 0:
            return "Fixed price"
        case 1:
            return "From"
        case 2:
            return "Guide price"
        case 3:
            return "Non quoting"
        case 4:
            return "Offers in the region of"
        case 5:
            return "Offers over"
        case 6:
            return "Price on application"
        case 7:
            return "Sale by tender"
        default:
            return ""
    }
}

export enum PropertyType {
    barnConversion,
    blockOfFlats,
    bungalow,
    businessPark,
    chalet,
    chateau,
    cottage,
    countryHouse,
    detached,
    detachedBungalow,
    endTerrace,
    equestrian,
    farm,
    farmhouse,
    finca,
    flat,
    hotel,
    houseboat,
    industrial,
    land,
    leisure,
    lightIndustrial,
    linkDetached,
    lodge,
    longere,
    maisonette,
    mews,
    office,
    parkHome,
    parking,
    pubBar,
    restaurant,
    retail,
    riad,
    semiDetached,
    semiDetachedBungalow,
    studio,
    terraced,
    terracedBungalow,
    townHouse,
    villa,
    warehouse
}

export const propertyType = (listing: Listing) => {
    switch (listing.propertyType) {
        case 8:
            return "Detached"
        case 15:
            return "Flat"
        case 37:
            return "Terraced"
        case 34:
            return "Semi-detached"
        case 19:
            return "Land"
        default:
            return "Property"
    }
}

export const propertyTypeLong = (listing: Listing) => {
    switch (listing.propertyType) {
        case 0:
            return "barn conversion"
        case 8:
            return "detached house"
        case 15:
            return "flat/apartment"
        case 28:
            return "park home"
        case 37:
            return "terraced house"
        case 34:
            return "semi-detached house"
        case 19:
            return "land / farm"
        default:
            return "property"
    }
}

export enum RentalTerm {
    fixedTerm,
    longTerm,
    shortTerm
}

export enum Tenure {
    feudal,
    freehold,
    leasehold,
    shareOfFreehold
}

export enum TransactionType {
    rent,
    sale
}

export enum UnitOfArea {
    SqFeet,
    SqYard,
    SqMetres,
    Acres,
    Hectares
}

export enum UnitOfLength {
    feet,
    metres
}

export enum Utility {
    electricity,
    gas,
    internet,
    satelliteCableTv,
    telephone,
    tvLicence,
    water
}



