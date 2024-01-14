export class AlgorithmStep {

    private name: string;
    private description: string;

    public run: Function;

    constructor(name: string, description: string, run: Function) {
        this.name = '';
        this.description = '';
        this.run = run;
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
        this.run ?? console.warn('runFunction is already set');
        this.run = runFunction;
    }
}