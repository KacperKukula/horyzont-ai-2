import { AlgorithmStep } from "./AlgorithmStep";

export abstract class AlghoritmParams {
    private runPlans: Array<AlgorithmStep> = [];

    pushStep(step: AlgorithmStep) {
        this.runPlans.push(step);
    }

    getSteps() {
        return this.runPlans;
    }
}