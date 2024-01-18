import { algorithmManager } from "./algorithmManager";
import { GenericParams } from "./algorythms/genericAlgorythm/model/genericParams";
import { formUtils } from "./utils";
import { GenericFactors } from "@/algorythms/genericAlgorythm/model/GenericFactors";

enum AlgorithmSelectors {
    FORM_ID = 'algorithmForm',
    CROSSING_RATE = 'crossingRate',
    MUTATION_RATE = 'mutationRate',
    FACTOR_A = 'factorA',
    FACTOR_B = 'factorB',
    FACTOR_C = 'factorC',
    FACTOR_D = 'factorD',
    END_WEIGHT = 'endWeight'
}

const form: HTMLFormElement | null = document.querySelector(`form#${AlgorithmSelectors.FORM_ID}`);
if(!form)
    console.error(`form#${AlgorithmSelectors.FORM_ID} is not defined`);

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Generic algorithm data
    const crossingRate = formUtils.getInputNumber(form, AlgorithmSelectors.CROSSING_RATE);
    const mutationRate = formUtils.getInputNumber(form, AlgorithmSelectors.MUTATION_RATE);
    const factorA = formUtils.getInputNumber(form, AlgorithmSelectors.FACTOR_A);
    const factorB = formUtils.getInputNumber(form, AlgorithmSelectors.FACTOR_B);
    const factorC = formUtils.getInputNumber(form, AlgorithmSelectors.FACTOR_C);
    const factorD = formUtils.getInputNumber(form, AlgorithmSelectors.FACTOR_D);

    const endWeight = formUtils.getInputNumber(form, AlgorithmSelectors.END_WEIGHT);

    const genericFactors = new GenericFactors(factorA, factorB, factorC, factorD);
    const genericParams = new GenericParams(genericFactors, crossingRate, mutationRate, endWeight);

    //Run algorithm
    const algorithmRun = genericParams ? algorithmManager.runGeneric(genericParams) : '';
});

form?.addEventListener('reset', (event) => {
    event.preventDefault();
    algorithmManager.clear();
});