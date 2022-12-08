import { AccessStatus } from '../../model/AccessStatus';
import { PriceQualifier, TransactionType } from '../../model/ListingAggregate/Objects/Pricing';
import { Category, CookerType, FurnishedState, PropertyType } from '../../model/ListingAggregate/ListingEnums';
import { MediaType } from '../../model/ListingAggregate/Objects/Content';

export const accessOptions = [
    {text: 'Private', value: AccessStatus.Private},
    {text: 'Public', value: AccessStatus.Public}
]

export const transactionOptions = [
    {text: 'Sale', value: TransactionType.sale},
    {text: 'Rent', value: TransactionType.rent},
]

export const channelOptions = [
    {text: 'Commercial', value: Category.commercial},
    {text: 'Residential', value: Category.residential},
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

export const furnishedOptions = [
    {text: 'Furnished', value: FurnishedState.furnished},
    {text: 'Furnished or unfurnished', value: FurnishedState.furnishedOrUnfurnished},
    {text: 'Part-furnished', value: FurnishedState.partFurnished},
    {text: 'Unfurnished', value: FurnishedState.unfurnished},
]

export const cookerOptions = [
    {text: 'Dual fuel', value: CookerType.dualFuel},
    {text: 'Electric', value: CookerType.electric},
    {text: 'Gas', value: CookerType.gas},
]
