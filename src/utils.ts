export function getRandom(min: number, max: number): number {
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    return result;
}

export function decimalToBooleanArray(decimal: number, maxBitNumber: number): boolean[] | void {
    if(Math.log2(decimal) > maxBitNumber)
        return console.warn(`This decimal number cannot save on ${maxBitNumber} bits!`);

    return decimal.toString(2).split('').map(bit => bit === '1' ? true : false);
}

export function booleanArrayToDecimal(boolArray: boolean[]): number {
    return boolArray.reduce((acc, bit, index) => acc + (bit ? Math.pow(2, boolArray.length - 1 - index) : 0), 0);
}

export class formUtils {

    static getInputValue(form: HTMLFormElement ,name: string): string {
        const input = form.elements.namedItem(name) as HTMLInputElement ?? console.error(`formUtils: ${name} is not defined`);
        return input.value;
    }

    static getInputNumber(form: HTMLFormElement ,name: string): number {
        const input = form.elements.namedItem(name) as HTMLInputElement ?? console.error(`formUtils: ${name} is not defined`);
        return Number(input.value);
    }
}