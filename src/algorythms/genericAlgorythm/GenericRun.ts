import { AlgorithmRun } from "../abstracts/algorithmRun";
import { AlgorithmStep } from "../abstracts/model/AlgorithmStep";
import { GenericParams } from "./model/genericParams";

export class GenericRun extends AlgorithmRun {

    genericParams: GenericParams;
    iterations: number = 0;

    constructor(genericParams: GenericParams) {
        super();
        this.genericParams = genericParams;
    }

    createRunPlan() {
        this.runPlan = [];
        this.runPlan.push(new AlgorithmStep('Adaptation', '', () =>  {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }));
    }

    async run(params: GenericParams) {
        let steps = params.getSteps();
        console.log(steps);
    }
}