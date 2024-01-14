import { Logger } from "./algorythms/abstracts/Logger";

export const alghorithmLogger = new class AlghorithmLogger extends Logger {

    public loggerOutput: HTMLElement | null;

    constructor() {
        super();
        this.loggerOutput = null;
    }

    init(selector: string) {
        this.loggerOutput = document.querySelector(selector)
        if(!this.loggerOutput) {
            throw new Error('Logger output not found');
        }
    }

    log(message: string) {
        this.loggerOutput 
            ? this.loggerOutput.innerHTML += message + '<br>'
            : console.warn('Logger output not found');

    }

    logPeriod(periods: number[], shots: number[]) {
        const div = document.createElement('div');
        div.classList.add('period');
    }
}