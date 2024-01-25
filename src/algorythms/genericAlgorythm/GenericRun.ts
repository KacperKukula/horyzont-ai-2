import { getRandom } from "@/utils";
import { Chromosome } from "./model/Chromosome";
import { GenericParams } from "./model/genericParams";
import { AlghorithmLogger, alghorithmLogger } from "@/alghorithmLogger";
import { genSelection, genCrossing, genMutation, countSumOfAdjustments } from "./GenericComposables";

export class GenericRun {

    logger: AlghorithmLogger;
    running: boolean = false;

    runPlan: Function[] = [];
    genom: Chromosome[] = [];
    genericParams: GenericParams;

    move: number = 0;
    iterations: number = 1;

    constructor(genericParams: GenericParams, logger: AlghorithmLogger) {
        // super();
        this.logger = logger;
        this.genericParams = genericParams;
    }

    async run() {
        this.logger.clear();
        this.running = true;

        this.logHeaderProgramStarted()

        this.createInitialGenom();
        this.createRunPlan();
        this.showExtendedGenom();

        let runIterator: number = 0;

        while(this.running) {
            if(this.runPlan[runIterator]) {
                this.runPlan[runIterator]();
                runIterator++;
            } else {
                runIterator = 0;
            }

            this.showExtendedGenom('Genom: ');
        }
    }

    createRunPlan() {
        this.runPlan = [];
        this.runPlan.push(() => {
            genSelection(this.genom, this.logger, this.genericParams);
            this.showExtendedGenom(`Genom after operation:`);
        });
        // this.runPlan.push(() => {
        //     genCrossing(this.genom, this.logger, this.genericParams.crossingRate);
        // });
        // this.runPlan.push(() => {
        //     genMutation(this.genom, this.logger, this.genericParams.mutationRate);
        // });
        this.runPlan.push(() => {
            this.iterations++;
            this.checkCondition();
            this.running = false;
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
        this.genom.forEach((gen, inx) => {
            const line = `Chr${inx}: ` + gen.getGenBinString() + ' | in dec: ' + gen.getGenDec();
            this.logger.log(line);
        })
    }

    overrideGenom(newGenom: Chromosome[]): void {
        if(newGenom)
            console.warn('New genom is not defined');
        this.genom = newGenom;
    }

    checkCondition() {
        let allSame = this.genom.every((chromosome, i, arr) => i === 0 || chromosome === arr[i - 1]);

        if(allSame) {
            this.running = false;
            this.logger.greenLog(`🥳 End condition met. Genoms are the same. We found it!`);
        } else {
            this.logger.redLog(`End condition not met. Genoms aren't the same`);
        }

        if(this.iterations > 50) {
            this.running = false;
            this.logger.redLog(`End condition not met. Iterations limit reached.`);
        }


        // const sumAdjust = countSumOfAdjustments(this.genom, this.genericParams);

        // if(this.genericParams.endWeight < countSumOfAdjustments(this.genom, this.genericParams)) 
        //     this.running = false;
        
        // const message = this.running
        //     ? `End condition not met. ${sumAdjust} is not less than ${this.genericParams.endWeight}`
        //     : `End condition met. ${sumAdjust} is less than ${this.genericParams.endWeight}`;
        // this.logCheckingEndCondition(message, this.running);
    }
    
    /* LOG SNIPPS */
    logHeaderProgramStarted() {
        const factors = this.genericParams.getFactors;

        this.logger.logHeader('Genetic algorythm started');
        this.logger.logHeader('----------------------------------------------------------------------');
        this.logger.logHeader('Params:');
        this.logger.logHeader('Factors: A: ' + factors.factorA + ' B: ' + factors.factorA + ' C: ' + factors.factorC + ' D: ' + factors.factorD);
        this.logger.logHeader('Counting for: ' + factors.factorA + ' * x^3 + ' + factors.factorB + ' x^2: ' + factors.factorC + ' x ' + factors.factorD);
        this.logger.logHeader('Crossing posibility: ' + this.genericParams.crossingRate + ' | Mutation posibility: ' + this.genericParams.mutationRate);
        this.logger.logHeader('End weight: ' + this.genericParams.endWeight);
        this.logger.logHeader('----------------------------------------------------------------------');
        this.logger.logHeader('...');
    }

    logCheckingEndCondition(message: string, good: boolean) {
        this.logger.logHeader('**************************************');
        this.logger.logHeader('Checking end condition ...');
        good ? this.logger.greenLog(message) : this.logger.redLog(message);
        this.logger.logHeader('**************************************');
    }
    
}