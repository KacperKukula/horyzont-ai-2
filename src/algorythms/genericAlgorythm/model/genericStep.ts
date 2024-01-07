import { AlgorithmStep } from "../../abstracts/model/AlgorithmStep";

class GenericStep extends AlgorithmStep {

    constructor(name: string, description: string, runStep: () => Promise<void>) {
        super(name, description, runStep);
    }
}