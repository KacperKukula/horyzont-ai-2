import { getRandom } from "@/utils";
import { PeriodDiagramData } from "./model/PeriodDiagramData";

export class PeriodDiagram {

    data: PeriodDiagramData;
    fullProcent: number;

    constructor(data: PeriodDiagramData, fullProcent: number) {
        this.data = data || {};
        this.fullProcent = fullProcent;
    }
    
    /**
     * Renders html with random periods
     * @returns string
     */
    generateRandomPeriods(): string {
        if(Object.keys(this.data).length === 0) {
            console.error('PeriodDiagramData is empty');
            return '';
        }

        let html = '<div class="periodDiagram">';
        let summingPeriod = 0;

        //Adding periods
        this.data.period.forEach((value, inx) => {
            const color = getRandomColor();
            const valueInProc = (value / this.fullProcent) * 100;
            html += `   <div class="period" style="left: ${summingPeriod}%; background-color: ${color}; width: ${valueInProc}%">`;
            html += `       <div class="periodLabel">Chr${inx}: ${valueInProc.toFixed(2)}%</div>`;
            html += `   </div>`;

            summingPeriod += valueInProc;
        });

        //Adding shots
        this.data.shots.forEach((value, inx) => {
            const valueInProc = (value / this.fullProcent) * 100;
            console.log(value, valueInProc+'%')
            html += `   <div class="shot" style="left: ${valueInProc}%;">`;
            html += `       <div class="shotLabel">S${inx}: ${valueInProc.toFixed(2)}%</div>`;
            html += `   </div>`;
        });

        html += `</div>`;

        return html;
    }
}

function getRandomColor(): string {
    return RANDOM_COLORS[getRandom(0, RANDOM_COLORS.length - 1)];
}

const RANDOM_COLORS = [
    '#2d88af',
    '#0c6348',
    '#86b78f',
    '#080f05',
    '#464e51',
    '#e2669c',
    '#a9d6e8',
    '#7f5935',
    '#e8b56f',
    '#718227',
    '#718227',
    '#6f4d8c',
    '#293806',
    '#293806',
    '#30e849',
    '#8c7cb7',
    '#8c7cb7',
];