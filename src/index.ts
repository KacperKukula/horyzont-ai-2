import { algorithmManager } from "./algorythmManager";
import { GenericParams } from "./algorythms/genericAlgorythm/model/genericParams";
import { formUtils } from "./utils";
import { GenericRun } from "./algorythms/genericAlgorythm/GenericRun";

enum AlgorithmSelectors {
    FORM_ID = 'algorithmForm',
    CROSSING_RATE = 'crossingRate',
    MUTATION_RATE = 'mutationRate',
    FACTOR_A = 'factorA',
    FACTOR_B = 'factorB',
    FACTOR_C = 'factorC',
    FACTOR_D = 'factorD',
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

    const genericFactors = new GenericFactors(factorA, factorB, factorC, factorD);
    const genericParams = new GenericParams(genericFactors, crossingRate, mutationRate);

    //Run algorithm
    const algorithmRun = new GenericRun(genericParams);
});