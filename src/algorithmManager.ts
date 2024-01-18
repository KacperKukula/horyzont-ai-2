import { alghorithmLogger } from "./alghorithmLogger";
import { GenericRun } from "./algorythms/genericAlgorythm/GenericRun";
import { GenericParams } from "./algorythms/genericAlgorythm/model/genericParams";

class AlgorithmManager {
    private static instance: AlgorithmManager;
    private static condition: () => boolean;

    public static getInstance(): AlgorithmManager {
        alghorithmLogger.init('#output');

        if (!AlgorithmManager.instance) {
            AlgorithmManager.instance = new AlgorithmManager();
        }
        return AlgorithmManager.instance;
    }

    public async runGeneric(params: GenericParams) {
        const genericRun = new GenericRun(params, alghorithmLogger);
        genericRun.run();
    }

    clear() {
        alghorithmLogger.clear();
    }
}

export const algorithmManager = AlgorithmManager.getInstance();