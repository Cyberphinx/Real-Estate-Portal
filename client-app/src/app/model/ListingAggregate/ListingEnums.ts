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
    none,
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

export enum DecorativeCondition {
    excellent,
    good,
    average,
    needsModernisation
}

export enum Eligibility {
    accepted,
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
    switch (listing.pricing.rentFrequency.toString()) {
        case "PerPersonPerWeek":
            return "/person/week"
        case "PerWeek":
            return "/week"
        case "PerMonth":
            return "/month"
        case "PerQuarter":
            return "/quarter"
        case "PerYear":
            return "/year"
        case "NotApplicable":
            return ""
        default:
            return ""
    }
}

export const rentFrequencyShort = (listing: Listing) => {
    switch (listing.pricing.rentFrequency.toString()) {
        case "PerPersonPerWeek":
            return "/p/w"
        case "PerWeek":
            return "/w"
        case "PerMonth":
            return "/m"
        case "PerQuarter":
            return "/q"
        case "PerYear":
            return "/y"
        case "NotApplicable":
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
    forSale,
    forRent,
    underOffer,
    referencesPending,
    soldSubjectToContract,
    sold,
    letAgreed,
    let,
    onHold,
    offMarket,
    other
}

export const lifeCycleStatusText = (listing: Listing) => {
    switch (listing.lifeCycleStatus.toString()) {
        case "ForSale":
            return "For Sale"
        case "ForRent":
            return "For Rent"
        case "UnderOffer":
            return "Under Offer"
        case "ReferencesPending":
            return "References Pending"
        case "SoldSubjectToContract":
            return "Sold Subject To Contract"
        case "Sold":
            return "Sold"
        case "LetAgreed":
            return "Let Agreed"
        case "Let":
            return "Let"
        case "OnHold":
            return "On Hold"
        case "OffMarket":
            return "Off Market"
        case "Other":
            return "Other"
        default:
            return ""
    }
}

export enum ListedBuildingGrade {
    notApplicable,
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



export enum FeatureSpace {
    balcony,
    basement,
    communalGarden,
    conservatory,
    gym,
    loft,
    outbuildings,
    privateGarden,
    roofTerrace,
    swimmingPool,
    tennisCourt,
    terrace,
    utilityRoom
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
    switch (priceQualifier.toString()) {
        case "FixedPrice":
            return "Fixed price"
        case "From":
            return "From"
        case "GuidePrice":
            return "Guide price"
        case "NonQuoting":
            return "Non quoting"
        case "OffersInTheRegionOf":
            return "Offers in the region of"
        case "OffersOver":
            return "Offers over"
        case "PriceOnApplication":
            return "Price on application"
        case "SaleByTender":
            return "Sale by tender"
        default:
            return ""
    }
}

export enum PropertyType {
    notSpecified,
    terracedHouse,
    endOfTerraceHouse,
    semiDetachedHouse,
    detachedHouse,
    mews,
    clusterHouse,
    groundFlat,
    flat,
    studio,
    groundMaisonette,
    maisonette,
    bungalow,
    terracedBungalow,
    semiDetachedBungalow,
    detachedBungalow,
    mobileHome,
    commercialProperty,
    land,
    linkDetachedHouse,
    townHouse,
    cottage,
    chalet,
    characterProperty,
    house,
    villa,
    apartment,
    penthouse,
    finca,
    barnConversion,
    servicedApartments,
    parking,
    shelteredHousing,
    retirementProperty,
    houseShare,
    flatShare,
    parkHome,
    garages,
    farmHouse,
    equestrianFacility,
    duplex,
    triplex,
    longere,
    gite,
    barn,
    unconvertedBarn,
    trulli,
    mill,
    commercialMill,
    ruins,
    restaurant,
    cafe,
    castle,
    villageHouse,
    caveHouse,
    cortijo,
    farmLand,
    plot,
    countryHouse,
    stoneHouse,
    caravan,
    lodge,
    logCabin,
    manorHouse,
    statelyHome,
    offPlan,
    semiDetachedVilla,
    detachedVilla,
    barNightClub,
    shop,
    riad,
    houseBoat,
    hotelRoom,
    blockOfApartments,
    privateHalls,
    office,
    businessPark,
    servicedOffice,
    retailPropertyHighStreet,
    retailPropertyOutOfTown,
    convenienceStore,
    garage,
    hairdresserBarberShop,
    petrolStation,
    postOffice,
    pub,
    workshopAndRetailSpace,
    distributionWarehouse,
    factory,
    heavyIndustrial,
    industrialPark,
    lightIndustrial,
    storage,
    showroom,
    warehouse,
    commercialLand,
    commercialDevelopment,
    industrialDevelopment,
    residentialDevelopment,
    dataCentre,
    farm,
    healthcareFacility,
    marineProperty,
    mixedUse,
    researchAndDevelopmentFacility,
    sciencePark,
    guestHouse,
    hospitality,
    leisureFacility,
    takeaway,
    childcareFacility,
    smallholding,
    placeOfWorship,
    tradeCounter,
    coachHouse
}

export function PropertyTypesArray() {
    let items: string[] = [];
    let length = Object.values(PropertyType).length / 2;
    for (let index = 0; index < length; index++) {
        const capitalLetter = PropertyType[index].charAt(0).toUpperCase()
        const element = PropertyType[index].toString().replace(/[A-Z]/g, ' $&').trim().slice(1);
        items.push(capitalLetter + element);
    }
    return items;
}

export const propertyType = (listing: Listing) => {
    switch (listing.propertyType.toString()) {
        case "BarnConversion":
            return "Barn conversion"
        case "Detached":
            return "Detached"
        case "Flat":
            return "Flat"
        case "ParkHome":
            return "Park home"
        case "Terraced":
            return "Terraced"
        case "SemiDetached":
            return "Semi-detached"
        case "Land":
            return "Land"
        default:
            return "Property"
    }
}

export const propertyTypeLong = (listing: Listing) => {
    switch (listing.propertyType.toString()) {
        case "BarnConversion":
            return "barn conversion"
        case "Detached":
            return "detached house"
        case "Flat":
            return "flat/apartment"
        case "ParkHome":
            return "park home"
        case "Terraced":
            return "terraced house"
        case "SemiDetached":
            return "semi-detached house"
        case "Land":
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
    shareOfFreehold,
    commonhold,
    sharedOwnership,
    other
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

export enum UniqueFeature {
    burglarAlarm,
    doubleGlazing,
    fireplace,
    fishingRights,
    porterSecurity,
    ruralSecluded,
    waterFront,
    woodenFloors
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

export enum WhiteGoods {
    airConditioner,
    cookerStove,
    dishwasher,
    fridge,
    freezer,
    oven,
    tumbleDryer,
    washingMachine,
}


