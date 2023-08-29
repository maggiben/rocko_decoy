function formatCurrency(number) {
    // Convert the number to a string
    const numStr = number.toString();
    
    // Split the number into integer and decimal parts
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? parts[1] : '';
    
    // Format the integer part with commas
    let formattedInteger = '';
    let count = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        const digit = integerPart[i];
        if (count !== 0 && count % 3 === 0) {
            formattedInteger = ',' + formattedInteger;
        }
        formattedInteger = digit + formattedInteger;
        count++;
    }
    
    // Combine integer and decimal parts
    const formattedNumber = formattedInteger + (decimalPart ? '.' + decimalPart : '');
    
    return formattedNumber;
}

export default formatCurrency