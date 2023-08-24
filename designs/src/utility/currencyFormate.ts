function formatCurrency(number: number): string {
    // Convert the number to a string
    const numStr: string = number.toString();
    
    // Split the number into integer and decimal parts
    const parts: string[] = numStr.split('.');
    const integerPart: string = parts[0];
    const decimalPart: string = parts.length > 1 ? parts[1] : '';
    
    // Format the integer part with commas
    let formattedInteger: string = '';
    let count: number = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        const digit: string = integerPart[i];
        if (count !== 0 && count % 3 === 0) {
            formattedInteger = ',' + formattedInteger;
        }
        formattedInteger = digit + formattedInteger;
        count++;
    }
    
    // Combine integer and decimal parts
    const formattedNumber: string = formattedInteger + (decimalPart ? '.' + decimalPart : '');
    
    return formattedNumber;
}

export default formatCurrency