import { Currency } from "../model/ListingAggregate/ListingEnums";

export default function priceFormatter(price: number, currencyIndex: number) {
    const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: Currency[currencyIndex].toUpperCase(), minimumFractionDigits: 0 });
    const result = priceFormat.format(price);
    return result;
}