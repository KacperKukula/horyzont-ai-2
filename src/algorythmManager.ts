class AlgorithmManager {
    private static instance: AlgorithmManager;

    public static getInstance(): AlgorithmManager {
        if (!AlgorithmManager.instance) {
        AlgorithmManager.instance = new AlgorithmManager();
        }
        return AlgorithmManager.instance;
    }

    public async runAlgorythm() {
        console.log('Algorythm started');
    }
}

export const algorithmManager = AlgorithmManager.getInstance();