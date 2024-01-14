import { getRandom } from "@/utils";
import { AlgorithmRun } from "../abstracts/algorithmRun";
import { AlgorithmStep } from "../abstracts/model/AlgorithmStep";
import { Chromosome } from "./model/Chromosome";
import { GenericParams } from "./model/genericParams";
import { alghorithmLogger } from "@/alghorithmLogger";
import { Logger } from "../abstracts/Logger";
import { genEquals } from "@/algorythms/genericAlgorythm/model/Chromosome";

export class GenericRun {

    logger: Logger;
    running: boolean = false;

    runPlan: Function[] = [];
    genom: Chromosome[] = [];
    genericParams: GenericParams;

    move: number = 0;
    iterations: number = 1;

    constructor(genericParams: GenericParams, logger: Logger) {
        // super();
        this.logger = logger;
        this.genericParams = genericParams;
    }

    async run() {
        this.running = true;
        
        this.createInitialGenom();
        this.createRunPlan();
        this.showExtendedGenom();

        let runIterator: number = 0;

        for(let i = 1; this.running; i++) {

            if(this.runPlan[runIterator]) {
                this.runPlan[runIterator]();
                runIterator++;
            } else {
                runIterator = 0;
            }

            this.genom = this.checkConditionAndReduce();
            
            // Show genom for each iteration
            this.showExtendedGenom(`Genom after ${i} iteration`);

        }
    }

    createRunPlan() {
        this.runPlan = [];
        this.runPlan.push(() => {
            this.selection();
        });
    }

    createInitialGenom() {
        for(let i = 0; i < 6; i++) {
            this.genom.push(new Chromosome(getRandom(1, 31)));
        }
    }

    showGenom(message: string = 'Genom:'): void {
        this.logger.log(message);
        this.genom.forEach(gen => {
            this.logger.log(gen.getGenBinString());
        })
    }

    showExtendedGenom(message: string = 'Genom:'): void {
        this.logger.log(message);
        this.genom.forEach(gen => {
            const line = gen.getGenBinString() + ' -> ' + gen.getGenDec();
            this.logger.log(line);
        })
    }

    countAdjustment(genDec: number): number {
        return (
            this.genericParams.factors.factorA * Math.pow(genDec, 3) +
            this.genericParams.factors.factorB * Math.pow(genDec, 2) +
            this.genericParams.factors.factorC * genDec +
            this.genericParams.factors.factorD
        );
    }

    overrideGenom(newGenom: Chromosome[]): void {
        if(newGenom)
            console.warn('New genom is not defined');
        this.genom = newGenom;
    }

    checkConditionAndReduce() {
        const genSet = new Set<Chromosome>();

        this.genom.forEach(gen => genSet.add(gen));

        if(genSet.size === 1) {
            this.running = false;
        }

        return [...genSet];
    }

    /* Composables */
    selection() {
        const adjusts: number[] = [];

        this.logger.log('Selection started ...');

        this.genom.forEach((gen, inx, arr) => {
            adjusts.push(this.countAdjustment(gen.getGenDec()));
        })

        this.logger.log('Adjustment: ');
        adjusts.forEach((adjust, inx) => {
            const gen = this.genom[inx];
            this.logger.log(`${gen.getGenDec()} -> ${adjust}`);
        });

        const adjustSum: number = Array.from(adjusts.values()).reduce((acc, adjust) => acc + adjust, 0);

        console.log(adjustSum)

        //Create table shots
        const shots: number[] = [];
        for(let i = 0; i < this.genom.length; i++) {
            shots.push(getRandom(0, adjustSum));
        }

        console.log(shots)

        //Get new genom
        const result: Chromosome[] = shots.map(shot => {
            let adjustPeriod: number = 0;
            let chosenGenom: Chromosome = this.genom[0];
            for(let i = 0; i < this.genom.length; i++) {
                adjustPeriod += adjusts[i];
                if(shot < adjustPeriod) {
                    chosenGenom = this.genom[i];
                    break;
                }
            }
            return chosenGenom;
        });

        this.logger.log('Selection ended');
        this.overrideGenom(result);
    }
}