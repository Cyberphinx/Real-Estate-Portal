export default function PriceFormatter(price: number, currency: string) {
    if (price !== 0) {
        const priceFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 0
        });
        const result = priceFormat.format(price);
        return result;
    } else {
        return 'POA';
    }

}