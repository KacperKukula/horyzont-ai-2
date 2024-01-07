import { AlghoritmParams } from "../../abstracts/model/AlghoritmParams";

export class GenericParams extends AlghoritmParams {

    factors: GenericFactors;
    CrossingRate: number;
    MutationRate: number;

    constructor(facors: GenericFactors, CrossingRate: number, MutationRate: number) {
        super();
        this.factors = facors;
        this.CrossingRate = CrossingRate;
        this.MutationRate = MutationRate;

        for (let key in this) {
            if (typeof this[key] === 'function' && this[key] === undefined) {
                console.error(`GenericParams: ${key} is undefined`);
            }
        }
    }
}