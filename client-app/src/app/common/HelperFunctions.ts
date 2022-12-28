export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function dateFormatter(date: Date) {
    return new Date(date).toLocaleString();
}

export function dateFormatterShort(date: Date) {
    return new Date(date).toLocaleDateString();
}