import { Chromosome } from "./model/Chromosome";
import { getRandom } from "@/utils";
import { GenericFactors } from "./model/GenericFactors";
import { GenericParams } from "./model/genericParams";
import { AlghorithmLogger } from "@/alghorithmLogger";

export function genSelection(genomRef: Chromosome[], loggerRef: AlghorithmLogger, genericParams: GenericParams) {
    const adjusts: number[] = [];

    loggerRef.yellowLog('🫴 Selection started ...');
    genomRef.forEach((gen, inx, arr) => {
        adjusts.push(countAdjustment(gen.getGenDec(), genericParams.getFactors));
    })

    loggerRef.log('⭐ Adjustment: ');
    adjusts.forEach((adjust, inx) => {
        const gen = genomRef[inx];
        loggerRef.log(`For: ${gen.getGenDec()} adjust equals ${adjust}`);
    });

    const adjustSum: number = Array.from(adjusts.values()).reduce((acc, adjust) => acc + adjust, 0);

    //Create table shots
    const shots: number[] = [];
    for(let i = 0; i < genomRef.length; i++) {
        shots.push(getRandom(0, adjustSum));
    }

    //Get new genom
    const result: Chromosome[] = shots.map(shot => {
        let adjustPeriod: number = 0;
        let chosenGenom: Chromosome = genomRef[0];
        for(let i = 0; i < genomRef.length; i++) {
            adjustPeriod += adjusts[i];
            if(shot < adjustPeriod) {
                chosenGenom = genomRef[i];
                break;
            }
        }
        return chosenGenom;
    });

    loggerRef.log('Selection ended');
    return result;
}

/**
 * Crossing for genom
 * @param genomRef 
 * @param loggerRef 
 * @param genericParams 
 * @returns 
 */
export function genCrossing(genomRef: Chromosome[], loggerRef: AlghorithmLogger, crossingRate: number) {
    loggerRef.yellowLog('Crossing started ...');

    for(let i=0; i < genomRef.length; i+=2) {
        const posibility = Math.random() < crossingRate;

        if(genomRef[i+1] && posibility) {
            const lotus = getRandom(1, genomRef[i].lenght - 1);
    
            const genTailFirst = genomRef[i].genBin.slice(lotus);
            const genTailSecond = genomRef[i+1].genBin.slice(lotus);

            genomRef[i].genBin = genomRef[i].genBin.slice(0, lotus).concat(genTailSecond);
            genomRef[i+1].genBin = genomRef[i+1].genBin.slice(0, lotus).concat(genTailFirst);
        } else {
            loggerRef.redLog(`Gen ${genomRef[i].getGenBinString()} not crossed`);
        }
    }
}

/**
 * Mutating genom
 * @param genomRef 
 * @param genericParams 
 * @returns 
 */
export function genMutation(genomRef: Chromosome[], loggerRef: AlghorithmLogger, mutatingRate: number): void {
    loggerRef.yellowLog('Mutation started ...');

    genomRef.forEach(gen => {
        const lotus = getRandom(0, gen.lenght - 1);
        const posibility = Math.random() < mutatingRate;
        if(posibility) {
            gen.genBin[lotus] = !gen.genBin[lotus];
        } else {
            loggerRef.redLog(`Gen ${gen.getGenBinString()} not mutated`);
        }
    });
}

/* CORE UTILS */

export function countSumOfAdjustments(genomRef: Chromosome[], genericParams: GenericParams): number {
    return genomRef.reduce((acc, gen) => acc + countAdjustment(gen.getGenDec(), genericParams.getFactors), 0);
}

function createAdjustmentArray(genomRef: Chromosome[], genericParams: GenericParams) {
    return genomRef.map(gen => countAdjustment(gen.getGenDec(), genericParams.getFactors))
}

export function countAdjustment(genDec: number, factors: GenericFactors): number {
    return (
        factors.factorA * Math.pow(genDec, 3) +
        factors.factorB * Math.pow(genDec, 2) +
        factors.factorC * genDec +
        factors.factorD
    );
}