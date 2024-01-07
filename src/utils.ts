export function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decimalToBooleanArray(decimal: number): boolean[] {
    return decimal.toString(2).split('').map(bit => bit === '1');
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