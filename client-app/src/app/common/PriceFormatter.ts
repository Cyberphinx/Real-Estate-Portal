import { Currency } from "../model/ListingAggregate/ListingEnums";

export default function priceFormatter(price: number, currencyIndex: number | string) {

    function currencyType() {
        switch (Number.isInteger(currencyIndex)) {
        case true:
            return Currency[Number(currencyIndex)].toString().toUpperCase();
        case false:
            return currencyIndex.toString().toUpperCase();
    }}

    const priceFormat = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currencyType(), 
        minimumFractionDigits: 0 });
    const result = priceFormat.format(price);
    return result;
}