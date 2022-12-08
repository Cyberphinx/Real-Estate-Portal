import { UnitOfArea } from './Areas';

export interface Pricing {
    transactionType: TransactionType;
    currency: Currency;
    price: number;
    pricePerUnitArea: PricePerUnitArea;
    rentFrequency: Frequency;
    priceQualifier: PriceQualifier;
    auction: boolean;
}

export enum TransactionType {
    rent,
    sale
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

export interface PricePerUnitArea {
    price: number;
    units: UnitOfArea;
}

export enum Frequency {
    perPersonPerWeek,
    perWeek,
    perMonth,
    perQuarter,
    perYear,
    notApplicable
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