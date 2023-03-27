import { UnitOfTime } from './../../model/Membership';
import { Frequency, UnitOfArea, CouncilTaxBand, DecorativeCondition, LifeCycleStatus, 
    ListedBuildingGrade, RentalTerm, Eligibility, Tenure, Utility, Incentive, FeatureSpace, WhiteGoods, Parking, CentralHeating } from './../../model/ListingAggregate/ListingEnums';
import { AccountType } from './../../model/User';
import { AccessStatus } from '../../model/AccessStatus';
import { Category, CookerType, FurnishedState, PriceQualifier, PropertyType, TransactionType } from '../../model/ListingAggregate/ListingEnums';
import { MediaType } from '../../model/Media';

export const accessOptions = [
    {text: 'Private', value: AccessStatus.Private},
    {text: 'Public', value: AccessStatus.Public}
]

export const accountTypeOptions = [
    {text: '( Customer )', value: AccountType.Customer},
    {text: '( Estate Agent )', value: AccountType.Agent},
    {text: '( Company )', value: AccountType.Company}
]

export const eligibilityOptions = [
    {text: 'Accepted', value: Eligibility.accepted}, 
    {text: 'Excluded', value: Eligibility.excluded}, 
    {text: 'Only', value: Eligibility.only}
]

export const channelOptions = [
    {text: 'Commercial', value: Category.commercial},
    {text: 'Residential', value: Category.residential},
]

export const cookerOptions = [
    {text: 'Dual fuel', value: CookerType.dualFuel},
    {text: 'Electric', value: CookerType.electric},
    {text: 'Gas', value: CookerType.gas},
]

export const councilTaxBandOptions = [
    {text: 'Not Specified', value: CouncilTaxBand.notSpecified},
    {text: 'Band A', value: CouncilTaxBand.a},
    {text: 'Band B', value: CouncilTaxBand.b},
    {text: 'Band C', value: CouncilTaxBand.c},
    {text: 'Band D', value: CouncilTaxBand.d},
    {text: 'Band E', value: CouncilTaxBand.e},
    {text: 'Band F', value: CouncilTaxBand.f},
    {text: 'Band G', value: CouncilTaxBand.g},
    {text: 'Band H', value: CouncilTaxBand.h},
    {text: 'Band I', value: CouncilTaxBand.i},
]

export const conditionOptions = [
    {text: 'Excellent', value: DecorativeCondition.excellent},
    {text: 'Good', value: DecorativeCondition.good},
    {text: 'Average', value: DecorativeCondition.average},
    {text: 'Needs modernisation', value: DecorativeCondition.needsModernisation}
]

export const furnishedOptions = [
    {text: 'Furnished', value: FurnishedState.furnished},
    {text: 'Furnished or unfurnished', value: FurnishedState.furnishedOrUnfurnished},
    {text: 'Part-furnished', value: FurnishedState.partFurnished},
    {text: 'Unfurnished', value: FurnishedState.unfurnished},
]

export const frequencyOptions = [
    {text: 'per month', value: Frequency.perMonth},
    {text: 'per quarter', value: Frequency.perQuarter},
    {text: 'per week', value: Frequency.perWeek},
    {text: 'per person per week', value: Frequency.perPersonPerWeek},
    {text: 'per year', value: Frequency.perYear},
]

export const goodsOptions = [
    {text: 'Air conditioner', value: WhiteGoods.airConditioner},
    {text: 'Cooker / stove', value: WhiteGoods.cookerStove},
    {text: 'Dishwasher', value: WhiteGoods.dishwasher},
    {text: 'Freezer', value: WhiteGoods.freezer},
    {text: 'Fridge', value: WhiteGoods.fridge},
    {text: 'Oven', value: WhiteGoods.oven},
    {text: 'Tumble dryer', value: WhiteGoods.tumbleDryer},
    {text: 'Washing machine', value: WhiteGoods.washingMachine}
]

export const parkingOptions = [
    {text: 'Single garage', value: Parking.singleGarage},
    {text: 'Double garage', value: Parking.doubleGarage},
    {text: 'Off street parking', value: Parking.offStreetParking},
    {text: 'Resident parking', value: Parking.residentsParking},
    {text: 'Underground parking', value: Parking.underground},
]

export const rentLifecycleOptions = [
    {text: 'For sale', value: LifeCycleStatus.forSale},
    {text: 'Under offer', value: LifeCycleStatus.underOffer},
    {text: 'Let agreed', value: LifeCycleStatus.letAgreed},
    {text: 'Let', value: LifeCycleStatus.let}
]

export const saleLifecycleOptions = [
    {text: 'For sale', value: LifeCycleStatus.forSale},
    {text: 'Under offer', value: LifeCycleStatus.underOffer},
    {text: 'Sold subject to contract', value: LifeCycleStatus.soldSubjectToContract},
    {text: 'Sold', value: LifeCycleStatus.sold}
]

export const spacesOptions = [
    {text: 'Balcony', value: FeatureSpace.balcony},
    {text: 'Basement', value: FeatureSpace.basement},
    {text: 'Communal garden', value: FeatureSpace.communalGarden},
    {text: 'Conservatory', value: FeatureSpace.conservatory},
    {text: 'Gym', value: FeatureSpace.gym},
    {text: 'Loft', value: FeatureSpace.loft},
    {text: 'Outbuildings', value: FeatureSpace.outbuildings},
    {text: 'Private garden', value: FeatureSpace.privateGarden},
    {text: 'Roof terrace', value: FeatureSpace.roofTerrace},
    {text: 'Swimming pool', value: FeatureSpace.swimmingPool},
    {text: 'Tennis court', value: FeatureSpace.tennisCourt},
    {text: 'Terrace', value: FeatureSpace.terrace},
    {text: 'Utility room', value: FeatureSpace.utilityRoom}
]

export const heatingOptions = [
    {text: 'None', value: CentralHeating.none},
    {text: 'Partial central heating', value: CentralHeating.partial},
    {text: 'Full central heating', value: CentralHeating.full},
]

export const incentiveOptions = [
    {text: 'Equity Loan', value: Incentive.equityLoan},
    {text: 'Help To Buy', value: Incentive.helpToBuy},
    {text: 'MI New Home', value: Incentive.miNewHome},
    {text: 'New Buy', value: Incentive.newBuy},
    {text: 'Part Buy Part Rent', value: Incentive.partBuyPartRent},
    {text: 'Shared Equity', value: Incentive.sharedEquity},
    {text: 'Shared Ownership', value: Incentive.sharedOwnership}
]

export const listedBuildingGradeOptions = [
    {text: 'Not applicable', value: ListedBuildingGrade.notApplicable},
    {text: 'Category A', value: ListedBuildingGrade.categoryA},
    {text: 'category B', value: ListedBuildingGrade.categoryB},
    {text: 'category C', value: ListedBuildingGrade.categoryC},
    {text: 'Grade A', value: ListedBuildingGrade.gradeA},
    {text: 'Grade B', value: ListedBuildingGrade.gradeB},
    {text: 'Grade B Plus', value: ListedBuildingGrade.gradeBPlus},
    {text: 'Grade One', value: ListedBuildingGrade.gradeOne},
    {text: 'Grade Two', value: ListedBuildingGrade.gradeTwo},
    {text: 'Grade Two Star', value: ListedBuildingGrade.gradeTwoStar},
    {text: 'Locally Listed', value: ListedBuildingGrade.locallyListed}
]

export const mediaOptions = [
    {text: 'Audio tour', value: MediaType.audioTour},
    {text: 'Brochure', value: MediaType.brochure},
    {text: 'Document', value: MediaType.document},
    {text: 'EPC graph', value: MediaType.epcGraph},
    {text: 'EPC report', value: MediaType.epcReport},
    {text: 'Floor plan', value: MediaType.floorPlan},
    {text: 'Home pack', value: MediaType.homePack},
    {text: 'Image', value: MediaType.image},
    {text: 'Site plan', value: MediaType.sitePlan},
    {text: 'Virtual tour', value: MediaType.virtualTour},
]

export const priceOptions = [
    {text: 'Fixed price', value: PriceQualifier.fixedPrice},
    {text: 'From', value: PriceQualifier.from},
    {text: 'Guide price', value: PriceQualifier.guidePrice},
    {text: 'Non-quoting', value: PriceQualifier.nonQuoting},
    {text: 'Offers in the region of', value: PriceQualifier.offersInTheRegionOf},
    {text: 'Offers over', value: PriceQualifier.offersOver},
    {text: 'Price on application', value: PriceQualifier.priceOnApplication},
    {text: 'Sale by tender', value: PriceQualifier.saleByTender},
]

export const propertyOptions = [
    {text: 'Detached', value: PropertyType.detachedHouse},
    {text: 'Flat', value: PropertyType.flat},
    {text: 'Terraced', value: PropertyType.terracedHouse},
    {text: 'Semi-detached', value: PropertyType.semiDetachedHouse},
    {text: 'Land', value: PropertyType.land},
    {text: 'Office', value: PropertyType.office},
]

export const propertyOptionsRemovals = [
    {text: 'House', value: 'House'},
    {text: 'Flat', value: 'Flat'},
    {text: 'Office', value: 'Office'},
    {text: 'Other', value: 'Other'}
]

export const propertyTypeOptions = [
    {text: 'Not Specified', value: 'notSpecified'},
    {text: 'Terraced House', value: 'terracedHouse'},
    {text: 'End of Terrace House', value: 'endOfTerraceHouse'},
    {text: 'Semi Detached House', value: 'semiDetachedHouse'},
    {text: 'Detached House', value: 'detachedHouse'},
    {text: 'Mews', value: 'mews'},
    {text: 'Cluster House', value: 'clusterHouse'},
    {text: 'Ground Flat', value: 'groundFlat'},
    {text: 'Flat', value: 'flat'},
    {text: 'Studio', value: 'studio'},
    {text: 'Ground Maisonette', value: 'groundMaisonette'},
    {text: 'Maisonette', value: 'maisonette'},
    {text: 'Bungalow', value: 'bungalow'},
    {text: 'Terraced Bungalow', value: 'terracedBungalow'},
    {text: 'Semi-Detached Bungalow', value: 'semiDetachedBungalow'},
    {text: 'Detached Bungalow', value: 'detachedBungalow'},
    {text: 'Mobile Home', value: 'mobileHome'},
    {text: 'Commercial Property', value: 'commercialProperty'},
    {text: 'Land', value: 'land'},
    {text: 'Link-Detached House', value: 'linkDetachedHouse'},
    {text: 'Town House', value: 'townHouse'},
    {text: 'Cottage', value: 'cottage'},
    {text: 'Chalet', value: 'chalet'},
    {text: 'Character Property', value: 'characterProperty'},
    {text: 'House', value: 'house'},
    {text: 'Villa', value: 'villa'},
    {text: 'Apartment', value: 'apartment'},
    {text: 'Penthouse', value: 'penthouse'},
    {text: 'Finca', value: 'finca'},
    {text: 'Barn Conversion', value: 'barnConversion'},
    {text: 'Serviced Apartments', value: 'servicedApartments'},
    {text: 'Parking', value: 'parking'},
    {text: 'Sheltered Housing', value: 'shelteredHousing'},
    {text: 'Retirement Property', value: 'retirementProperty'},
    {text: 'House Share', value: 'houseShare'},
    {text: 'Flat Share', value: 'flatShare'},
    {text: 'Park Home', value: 'parkHome'},
    {text: 'Garages', value: 'garages'},
    {text: 'FarmHouse', value: 'farmHouse'},
    {text: 'Equestrian Facility', value: 'equestrianFacility'},
    {text: 'Duplex', value: 'duplex'},
    {text: 'Triplex', value: 'triplex'},
    {text: 'Longere', value: 'longere'},
    {text: 'Gite', value: 'gite'},
    {text: 'Barn', value: 'barn'},
    {text: 'Unconverted Barn', value: 'unconvertedBarn'},
    {text: 'Trulli', value: 'trulli'},
    {text: 'Mill', value: 'mill'},
    {text: 'Commercial Mill', value: 'commercialMill'},
    {text: 'Ruins', value: 'ruins'},
    {text: 'Restaurant', value: 'restaurant'},
    {text: 'Cafe', value: 'cafe'},
    {text: 'Castle', value: 'castle'},
    {text: 'Village House', value: 'villageHouse'},
    {text: 'Cave House', value: 'caveHouse'},
    {text: 'Cortijo', value: 'cortijo'},
    {text: 'Farm Land', value: 'farmLand'},
    {text: 'Plot', value: 'plot'},
    {text: 'Country House', value: 'countryHouse'},
    {text: 'Stone House', value: 'stoneHouse'},
    {text: 'Caravan', value: 'caravan'},
    {text: 'Lodge', value: 'lodge'},
    {text: 'Log Cabin', value: 'logCabin'},
    {text: 'Manor House', value: 'manorHouse'},
    {text: 'Stately Home', value: 'statelyHome'},
    {text: 'Off Plan', value: 'offPlan'},
    {text: 'Semi-Detached Villa', value: 'semiDetachedVilla'},
    {text: 'Detached Villa', value: 'detachedVilla'},
    {text: 'Bar / Night Club', value: 'barNightClub'},
    {text: 'Shop', value: 'shop'},
    {text: 'Riad', value: 'riad'},
    {text: 'House Boat', value: 'houseBoat'},
    {text: 'Hotel Room', value: 'hotelRoom'},
    {text: 'Block of Apartments', value: 'blockOfApartments'},
    {text: 'Private Halls', value: 'privateHalls'},
    {text: 'Office', value: 'office'},
    {text: 'Business Park', value: 'businessPark'},
    {text: 'Serviced Office', value: 'servicedOffice'},
    {text: 'Retail Property High Street', value: 'retailPropertyHighStreet'},
    {text: 'Retail Property Out of Town', value: 'retailPropertyOutOfTown'},
    {text: 'Convenience Store', value: 'convenienceStore'},
    {text: 'Garage', value: 'garage'},
    {text: 'Hairdresser BarberShop', value: 'hairdresserBarberShop'},
    {text: 'Petrol Station', value: 'petrolStation'},
    {text: 'Post Office', value: 'postOffice'},
    {text: 'Pub', value: 'pub'},
    {text: 'Workshop & Retail Space', value: 'workshopAndRetailSpace'},
    {text: 'Distribution Warehouse', value: 'distributionWarehouse'},
    {text: 'Factory', value: 'factory'},
    {text: 'Heavy Industrial', value: 'heavyIndustrial'},
    {text: 'Industrial Park', value: 'industrialPark'},
    {text: 'Light Industrial', value: 'lightIndustrial'},
    {text: 'Storage', value: 'storage'},
    {text: 'Showroom', value: 'showroom'},
    {text: 'Warehouse', value: 'warehouse'},
    {text: 'Commercial Land', value: 'commercialLand'},
    {text: 'Commercial Development', value: 'commercialDevelopment'},
    {text: 'Industrial Development', value: 'industrialDevelopment'},
    {text: 'Residential Development', value: 'residentialDevelopment'},
    {text: 'Data Centre', value: 'dataCentre'},
    {text: 'Farm', value: 'farm'},
    {text: 'Healthcare Facility', value: 'healthcareFacility'},
    {text: 'Marine Property', value: 'marineProperty'},
    {text: 'Mixed-Use', value: 'mixedUse'},
    {text: 'Research & Development Facility', value: 'researchAndDevelopmentFacility'},
    {text: 'Science Park', value: 'sciencePark'},
    {text: 'Guest House', value: 'guestHouse'},
    {text: 'Hospitality', value: 'hospitality'},
    {text: 'Leisure Facility', value: 'leisureFacility'},
    {text: 'Takeaway', value: 'takeaway'},
    {text: 'Childcare Facility', value: 'childcareFacility'},
    {text: 'Smallholding', value: 'smallholding'},
    {text: 'Place of Worship', value: 'placeOfWorship'},
    {text: 'Trade Counter', value: 'tradeCounter'},
    {text: 'Coach House', value: 'coachHouse'}
]

export const notSpecifiedOption = [
    {text: 'Not Specified', value: 'notSpecified'}
]

export const housesOptions = [
    {text: 'Terraced House', value: 'terracedHouse'},
    {text: 'End of Terrace House', value: 'endOfTerraceHouse'},
    {text: 'Semi Detached House', value: 'semiDetachedHouse'},
    {text: 'Detached House', value: 'detachedHouse'},
    {text: 'Mews', value: 'mews'},
    {text: 'Cluster House', value: 'clusterHouse'},
    {text: 'Link-Detached House', value: 'linkDetachedHouse'},
    {text: 'Town House', value: 'townHouse'},
    {text: 'Cottage', value: 'cottage'},
    {text: 'Chalet', value: 'chalet'},
    {text: 'House', value: 'house'},
    {text: 'Villa', value: 'villa'},
    {text: 'Finca', value: 'finca'},
    {text: 'Village House', value: 'villageHouse'},
    {text: 'Semi-Detached Villa', value: 'semiDetachedVilla'},
    {text: 'Detached Villa', value: 'detachedVilla'},
]

export const apartmentsOptions = [
    {text: 'Ground Flat', value: 'groundFlat'},
    {text: 'Flat', value: 'flat'},
    {text: 'Studio', value: 'studio'},
    {text: 'Ground Maisonette', value: 'groundMaisonette'},
    {text: 'Maisonette', value: 'maisonette'},
    {text: 'Apartment', value: 'apartment'},
    {text: 'Penthouse', value: 'penthouse'},
    {text: 'Serviced Apartments', value: 'servicedApartments'},
    {text: 'Duplex', value: 'duplex'},
    {text: 'Triplex', value: 'triplex'},
    {text: 'Hotel Room', value: 'hotelRoom'},
    {text: 'Block of Apartments', value: 'blockOfApartments'},
    {text: 'Private Halls', value: 'privateHalls'},
    {text: 'Coach House', value: 'coachHouse'}
]

export const bungalowsOptions = [
    {text: 'Bungalow', value: 'bungalow'},
    {text: 'Terraced Bungalow', value: 'terracedBungalow'},
    {text: 'Semi-Detached Bungalow', value: 'semiDetachedBungalow'},
    {text: 'Detached Bungalow', value: 'detachedBungalow'},
]

export const mobileParkHomesOptions = [
    {text: 'Mobile Home', value: 'mobileHome'},
    {text: 'Park Home', value: 'parkHome'},
    {text: 'Caravan', value: 'caravan'},
]

export const commercialPropertyOptions = [
    {text: 'Commercial Property', value: 'commercialProperty'},
    {text: 'Commercial Mill', value: 'commercialMill'},
    {text: 'Restaurant', value: 'restaurant'},
    {text: 'Cafe', value: 'cafe'},
    {text: 'Bar / Night Club', value: 'barNightClub'},
    {text: 'Shop', value: 'shop'},
    {text: 'Office', value: 'office'},
    {text: 'Business Park', value: 'businessPark'},
    {text: 'Serviced Office', value: 'servicedOffice'},
    {text: 'Retail Property High Street', value: 'retailPropertyHighStreet'},
    {text: 'Retail Property Out of Town', value: 'retailPropertyOutOfTown'},
    {text: 'Convenience Store', value: 'convenienceStore'},
    {text: 'Hairdresser BarberShop', value: 'hairdresserBarberShop'},
    {text: 'Petrol Station', value: 'petrolStation'},
    {text: 'Post Office', value: 'postOffice'},
    {text: 'Pub', value: 'pub'},
    {text: 'Workshop & Retail Space', value: 'workshopAndRetailSpace'},
    {text: 'Distribution Warehouse', value: 'distributionWarehouse'},
    {text: 'Factory', value: 'factory'},
    {text: 'Heavy Industrial', value: 'heavyIndustrial'},
    {text: 'Industrial Park', value: 'industrialPark'},
    {text: 'Light Industrial', value: 'lightIndustrial'},
    {text: 'Storage', value: 'storage'},
    {text: 'Showroom', value: 'showroom'},
    {text: 'Warehouse', value: 'warehouse'},
    {text: 'Commercial Land', value: 'commercialLand'},
    {text: 'Commercial Development', value: 'commercialDevelopment'},
    {text: 'Industrial Development', value: 'industrialDevelopment'},
    {text: 'Residential Development', value: 'residentialDevelopment'},
    {text: 'Data Centre', value: 'dataCentre'},
    {text: 'Farm', value: 'farm'},
    {text: 'Healthcare Facility', value: 'healthcareFacility'},
    {text: 'Marine Property', value: 'marineProperty'},
    {text: 'Mixed-Use', value: 'mixedUse'},
    {text: 'Research & Development Facility', value: 'researchAndDevelopmentFacility'},
    {text: 'Science Park', value: 'sciencePark'},
    {text: 'Guest House', value: 'guestHouse'},
    {text: 'Hospitality', value: 'hospitality'},
    {text: 'Leisure Facility', value: 'leisureFacility'},
    {text: 'Takeaway', value: 'takeaway'},
    {text: 'Childcare Facility', value: 'childcareFacility'},
    {text: 'Place of Worship', value: 'placeOfWorship'},
    {text: 'Trade Counter', value: 'tradeCounter'}
]

export const landOptions = [
    {text: 'Land', value: 'land'},
    {text: 'Farm Land', value: 'farmLand'},
    {text: 'Plot', value: 'plot'},
    {text: 'Off Plan', value: 'offPlan'},
    {text: 'Smallholding', value: 'smallholding'}
]

export const characterPropertyOptions = [
    {text: 'Character Property', value: 'characterProperty'},
    {text: 'Barn Conversion', value: 'barnConversion'},
    {text: 'FarmHouse', value: 'farmHouse'},
    {text: 'Equestrian Facility', value: 'equestrianFacility'},
    {text: 'Longere', value: 'longere'},
    {text: 'Gite', value: 'gite'},
    {text: 'Barn', value: 'barn'},
    {text: 'Unconverted Barn', value: 'unconvertedBarn'},
    {text: 'Trulli', value: 'trulli'},
    {text: 'Mill', value: 'mill'},
    {text: 'Ruins', value: 'ruins'},
    {text: 'Castle', value: 'castle'},
    {text: 'Cave House', value: 'caveHouse'},
    {text: 'Cortijo', value: 'cortijo'},
    {text: 'Country House', value: 'countryHouse'},
    {text: 'Stone House', value: 'stoneHouse'},
    {text: 'Lodge', value: 'lodge'},
    {text: 'Log Cabin', value: 'logCabin'},
    {text: 'Manor House', value: 'manorHouse'},
    {text: 'Stately Home', value: 'statelyHome'},
    {text: 'Riad', value: 'riad'},
    {text: 'House Boat', value: 'houseBoat'}
]

export const garageParkingOptions = [
    {text: 'Parking', value: 'parking'},
    {text: 'Garages', value: 'garages'},
    {text: 'Garage', value: 'garage'},
]

export const retirementOptions = [
    {text: 'Sheltered Housing', value: 'shelteredHousing'},
    {text: 'Retirement Property', value: 'retirementProperty'}
]

export const rentalTermOptions = [
    {text: 'Long term', value: RentalTerm.longTerm},
    {text: 'Short term', value: RentalTerm.shortTerm},
    {text: 'Fixed term', value: RentalTerm.fixedTerm},
]

export const transactionOptions = [
    {text: 'Sale', value: TransactionType.sale},
    {text: 'Rent', value: TransactionType.rent},
]

export const tenureOptions = [
    {text: 'Freehold', value: Tenure.freehold},
    {text: 'Leasehold', value: Tenure.leasehold},
    {text: 'Share of freehold', value: Tenure.shareOfFreehold},
    {text: 'Commonhold', value: Tenure.commonhold},
    {text: 'Shared ownership', value: Tenure.sharedOwnership},
    {text: 'Feudal', value: Tenure.feudal},
]

export const unitOfAreaOptions = [
    {text: 'Square meters', value: UnitOfArea.SqMetres},
    {text: 'Square feet', value: UnitOfArea.SqFeet}
]

export const unitOfTimeOptions = [
    {text: 'Months', value: UnitOfTime.Months},
    {text: 'Years', value: UnitOfTime.Years}
]

export const utilityOptions = [
    {text: 'Electricity', value: Utility.electricity},
    {text: 'Gas', value: Utility.gas},
    {text: 'Internet', value: Utility.internet},
    {text: 'Satellite cable tv', value: Utility.satelliteCableTv},
    {text: 'Telephone', value: Utility.telephone},
    {text: 'TV license', value: Utility.tvLicence},
    {text: 'Water', value: Utility.water}
]




