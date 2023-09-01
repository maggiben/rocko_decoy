import formatCurrency from "../utils/currencyFormate";
export const shortenAddress = ( address, count = 7 ) => {
    return address.slice( 0, count ) + '...' + address.slice( -count )
}

export function financial(x, decimal) {
    return formatCurrency(Number.parseFloat(x).toFixed(decimal));
}