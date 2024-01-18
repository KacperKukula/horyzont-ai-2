import { Logger } from "./algorythms/abstracts/Logger";

export class AlghorithmLogger extends Logger {

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

    logHeader(message: string) {
        this.loggerOutput 
            ? this.loggerOutput.innerHTML += `<span class="header">${message}</span><br>`
            : console.warn('Logger output not found');
    }

    yellowLog(message: string) {
        this.loggerOutput 
            ? this.loggerOutput.innerHTML += `<span class="yellow">${message}</span><br>`
            : console.warn('Logger output not found');
    }

    redLog(message: string) {
        this.loggerOutput 
            ? this.loggerOutput.innerHTML += `<span class="red">${message}</span><br>`
            : console.warn('Logger output not found');
    }

    greenLog(message: string) {
        this.loggerOutput 
            ? this.loggerOutput.innerHTML += `<span class="green">${message}</span><br>`
            : console.warn('Logger output not found');
    }

    logPeriod(periods: number[], shots: number[]) {
        const div = document.createElement('div');
        div.classList.add('period');
    }

    clear() {
        if(this.loggerOutput) {
            this.loggerOutput.innerHTML = '';
        }
    }
}

/* SINGLETONE */
export const alghorithmLogger = new AlghorithmLogger();