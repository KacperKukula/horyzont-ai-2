import { AlghoritmParams } from "./model/AlghoritmParams";
import { AlgorithmStep } from "./model/AlgorithmStep";

export abstract class AlgorithmRun {

    public runPlan: AlgorithmStep[] = [];
        
    public abstract run(): any;

    //public abstract createRunPlan(alghorithmParams: AlghoritmParams): void;

    constructor() {
        this.runPlan = [];
    }
}