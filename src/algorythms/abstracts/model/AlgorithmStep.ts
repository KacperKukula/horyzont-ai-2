export class AlgorithmStep {

    private name: string;
    private description: string;

    public runStep: () => void;

    constructor(name: string, description: string, runStep: () => Promise<void>) {
        this.name = '';
        this.description = '';
        this.runStep = () => { };
    }
    get getName() {
        return this.name;
    }
    set setName(value: string) {
        this.name = value;
    }
    get getDescription() {
        return this.description;
    }
    set setDescription(value: string) {
        this.description = value;
    }
    set setRun(runFunction: () => Promise<void>) {
        if(typeof runFunction !== 'function') {
            console.error('runFunction is not a function');
            return;
        }
        this.runStep ?? console.warn('runFunction is already set');
        this.runStep = runFunction;
    }
}