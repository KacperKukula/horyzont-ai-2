import { AlghoritmParams } from "../../abstracts/model/AlghoritmParams";
import { Chromosome } from "./Chromosome";
import { GenericFactors } from "./GenericFactors";

/**
 * For generic params all @params are @required
 */
export class GenericParams extends AlghoritmParams {

    factors: GenericFactors;
    crossingRate: number;
    mutationRate: number;

    constructor(facors: GenericFactors, crossingRate: number, mutationRate: number) {
        super();
        this.factors = facors;
        this.crossingRate = crossingRate;
        this.mutationRate = mutationRate;

        for (let key in this) {
            if (typeof this[key] === 'function' && this[key] === undefined) {
                console.error(`GenericParams: ${key} is undefined`);
            }
        }
    }

    getFactors(): GenericFactors {
        return this.factors;
    }

    // validate() {
    //     const errors = [];
    //     for (let key in this) {
    //         if (typeof this[key] !== 'function' || this[key]) {
                
    //         }
    //     }
    // }
}