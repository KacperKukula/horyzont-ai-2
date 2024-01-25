import { Chromosome } from "./model/Chromosome";
import { getRandom } from "@/utils";
import { GenericFactors } from "./model/GenericFactors";
import { GenericParams } from "./model/genericParams";
import { AlghorithmLogger } from "@/alghorithmLogger";

export function genSelection(genomRef: Chromosome[], loggerRef: AlghorithmLogger, genericParams: GenericParams) {
    const adjusts: number[] = [];
    const adjustsPeriod: number[] = [0];
    const genSnapShot = Object.assign({}, genomRef);

    loggerRef.yellowLog('🫴 Selection started ...');
    genomRef.forEach((gen, inx, arr) => {
        //Add adjustment to array
        adjusts.push(countAdjustment(gen.getGenDec(), genericParams.getFactors));

        //Add period to array
        adjustsPeriod.push(adjustsPeriod[inx] + adjusts[inx]);
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

    //Change genoms
    shots.forEach((shot, shotInx) => {
        const genInx = adjustsPeriod.findIndex((period, inx, periods) => period < shot && shot <= periods[inx+1]);
        genomRef[shotInx] = genSnapShot[genInx];
    });

    //Log all things
    console.log(adjusts, shots)
    loggerRef.logPeriod(adjusts, shots, adjustSum);
}

/**
 * Crossing for genom
 * @param genomRef 
 * @param loggerRef 
 * @param genericParams 
 * @returns 
 */
export function genCrossing(genomRef: Chromosome[], loggerRef: AlghorithmLogger, crossingRate: number) {
    loggerRef.yellowLog('❎ Crossing started ...');

    for(let i=0; i < genomRef.length; i+=2) {
        const random = parseFloat(Math.random().toFixed(2));
        const posibility = random < crossingRate;

        if(genomRef[i+1] && posibility) {
            const lotus = getRandom(1, genomRef[i].lenght - 1);

            const prevGenomFirst: string = genomRef[i].getGenBinString();
            const prevGenomSecond: string = genomRef[i+1].getGenBinString();
    
            const genTailFirst = genomRef[i].genBin.slice(lotus);
            const genTailSecond = genomRef[i+1].genBin.slice(lotus);

            genomRef[i].genBin = genomRef[i].genBin.slice(0, lotus).concat(genTailSecond);
            genomRef[i+1].genBin = genomRef[i+1].genBin.slice(0, lotus).concat(genTailFirst);

            loggerRef.greenLog(`Gen ${genomRef[i].getGenBinString()} crossed. Pk = ${random} >= ${crossingRate}`);
            loggerRef.log(`Gen Chr${i} crossed with Chr${i+1} with ${lotus} lotus.`);
            loggerRef.log(`${prevGenomFirst} changed to ${genomRef[i].getGenBinString()}`);
            loggerRef.log(`${prevGenomSecond} changed to ${genomRef[i+1].getGenBinString()}`);
            
        } else {
            loggerRef.redLog(`Gen Chr${i} and Chr${i+1} not crossed. Pk => ${random} < ${crossingRate}`);
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
    loggerRef.yellowLog('🦆 Mutation started ...');

    genomRef.forEach((gen, inx) => {
        const lotus = getRandom(0, gen.lenght - 1);
        const random = parseFloat(Math.random().toFixed(2));
        const posibility = random < mutatingRate;
        if(posibility) {
            const previousGen = gen.getGenBinString();

            genomRef[inx].genBin[lotus] = !gen.genBin[lotus];

            loggerRef.greenLog(`Gen Chr${inx}: ${previousGen} mutated. Pm = ${random} <= ${mutatingRate}`);
            loggerRef.log(`Previous: ${previousGen} changed to ${gen.getGenBinString()}. Lotus ${lotus}`);
        } else {
            loggerRef.redLog(`Gen Chr${inx} ${gen.getGenBinString()} not mutated. P => ${random} > ${mutatingRate}`);
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