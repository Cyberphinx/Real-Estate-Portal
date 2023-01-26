import { UnitOfTime } from './../../model/Membership';
import { EpcRatings } from './../../model/ListingAggregate/ListingObjects';
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
    {text: 'Not Applicable', value: CouncilTaxBand.none},
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
    {text: 'Available', value: LifeCycleStatus.available},
    {text: 'Under offer', value: LifeCycleStatus.underOffer},
    {text: 'Let agreed', value: LifeCycleStatus.letAgreed},
    {text: 'Let', value: LifeCycleStatus.let}
]

export const saleLifecycleOptions = [
    {text: 'Available', value: LifeCycleStatus.available},
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
    {text: 'Detached', value: PropertyType.detached},
    {text: 'Flat', value: PropertyType.flat},
    {text: 'Terraced', value: PropertyType.terraced},
    {text: 'Semi-detached', value: PropertyType.semiDetached},
    {text: 'Land', value: PropertyType.land},
    {text: 'Office', value: PropertyType.office},
]

export const propertyTypeOptions = [
    {text: 'Barn conversion', value: PropertyType.barnConversion},
    {text: 'Block of flats', value: PropertyType.blockOfFlats},
    {text: 'Bungalow', value: PropertyType.bungalow},
    {text: 'Business park', value: PropertyType.businessPark},
    {text: 'Chatlet', value: PropertyType.chalet},
    {text: 'Chateau', value: PropertyType.chateau},
    {text: 'Cottage', value: PropertyType.cottage},
    {text: 'Country house', value: PropertyType.countryHouse},
    {text: 'Detached house', value: PropertyType.detached},
    {text: 'Detached bungalow', value: PropertyType.detachedBungalow},
    {text: 'End terrace', value: PropertyType.endTerrace},
    {text: 'Equestrian', value: PropertyType.equestrian},
    {text: 'Farm', value: PropertyType.farm},
    {text: 'Farm house', value: PropertyType.farmhouse},
    {text: 'Finca', value: PropertyType.finca},
    {text: 'Flat', value: PropertyType.flat},
    {text: 'Hotel', value: PropertyType.hotel},
    {text: 'Houseboat', value: PropertyType.houseboat},
    {text: 'Industrial', value: PropertyType.industrial},
    {text: 'Land', value: PropertyType.land},
    {text: 'Leisure', value: PropertyType.leisure},
    {text: 'Light industrial', value: PropertyType.lightIndustrial},
    {text: 'Link-detached house', value: PropertyType.linkDetached},
    {text: 'Lodge', value: PropertyType.lodge},
    {text: 'Longere', value: PropertyType.longere},
    {text: 'Maisonette', value: PropertyType.maisonette},
    {text: 'Mews', value: PropertyType.mews},
    {text: 'Office', value: PropertyType.office},
    {text: 'Park home', value: PropertyType.parkHome},
    {text: 'Parking', value: PropertyType.parking},
    {text: 'Pub bar', value: PropertyType.pubBar},
    {text: 'Restaurant', value: PropertyType.restaurant},
    {text: 'Retail', value: PropertyType.retail},
    {text: 'Riad', value: PropertyType.riad},
    {text: 'Semi-detached house', value: PropertyType.semiDetached},
    {text: 'Semi-detached bungalow', value: PropertyType.semiDetachedBungalow},
    {text: 'Studio', value: PropertyType.studio},
    {text: 'Terraced house', value: PropertyType.terraced},
    {text: 'Terraced bungalow', value: PropertyType.terracedBungalow},
    {text: 'Town house', value: PropertyType.townHouse},
    {text: 'Villa', value: PropertyType.villa},
    {text: 'Warehouse', value: PropertyType.warehouse}
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




