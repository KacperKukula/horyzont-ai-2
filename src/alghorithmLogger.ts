import { Logger } from "./algorythms/abstracts/Logger";
import { PeriodDiagram } from "./dataView/periodDiagram/PeriodDiagram";
import { PeriodDiagramData } from "./dataView/periodDiagram/model/PeriodDiagramData";

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

    logPeriod(periods: number[], shots: number[], fullAdjust: number) {
        const diagramRenderer = new PeriodDiagram(
            new PeriodDiagramData(periods, shots),
            fullAdjust
        );

        console.log(diagramRenderer.generateRandomPeriods());
        
        this.log(diagramRenderer.generateRandomPeriods());
    }

    clear() {
        if(this.loggerOutput) {
            this.loggerOutput.innerHTML = '';
        }
    }
}

/* SINGLETONE */
export const alghorithmLogger = new AlghorithmLogger();