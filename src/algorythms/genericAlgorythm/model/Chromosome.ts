import { decimalToBooleanArray } from "@/utils";

export class Chromosome {

    static MAX_BITS_NUMBER = 6;

    genBin: boolean[] = new Array(Chromosome.MAX_BITS_NUMBER).fill(false);
    lenght: number = Chromosome.MAX_BITS_NUMBER;

    constructor(genDec: number) {
        // Get raw binary array
        this.genBin = decimalToBooleanArray(genDec, Chromosome.MAX_BITS_NUMBER) ?? this.genBin;
        while (this.genBin.length < Chromosome.MAX_BITS_NUMBER) this.genBin.unshift(false);
    }

    getGenBinString(): string {
        return this.genBin.map(bit => bit ? 1 : 0).join(' ');
    }

    getGenDec(): number {
        return this.genBin.reduce((acc, bit, index) => acc + (bit ? Math.pow(2, Chromosome.MAX_BITS_NUMBER - 1 - index) : 0), 0);
    }
}

export function genEquals(genFirst: Chromosome, genSecond: Chromosome) {
    return genFirst.genBin.every((bit, index) => bit === genSecond.genBin[index]);
}