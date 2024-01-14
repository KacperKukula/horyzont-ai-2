export class GenericFactors {

    factorA: number;
    factorB: number;
    factorC: number;
    factorD: number;

    constructor(A: number, B: number, C: number, D: number) {
        this.factorA = A;
        this.factorB = B;
        this.factorC = C;
        this.factorD = D;

        // Check if all factors are defined
        for (let key in this) {
            if (typeof this[key] === 'function' && this[key] === undefined) {
                console.error(`GenericFactors: ${key} is undefined`);
            }
        }
    }
}