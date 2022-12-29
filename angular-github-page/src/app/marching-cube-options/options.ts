export class Options {
    formula: string
    isolevel: number
    totalSize: number
    individualSize: number
    showGrid: boolean
    showVertices: boolean

    constructor(formula: string, isolevel: number, totalSize: number, individualSize: number, showGrid: boolean, showVertices: boolean) {
        this.formula = formula
        this.isolevel = isolevel
        this.totalSize = totalSize
        this.individualSize = individualSize
        this.showGrid = showGrid
        this.showVertices = showVertices
    }

    sanitize() {
        this.formula = this.formula ? this.formula.toLowerCase() : "noise * 70 - length + 100";
        this.isolevel = this.isolevel ? this.isolevel : 1;
        this.totalSize = this.totalSize ? this.totalSize : 200;
        this.individualSize = this.individualSize ? this.individualSize : 10;
        this.showGrid = this.showGrid ? this.showGrid : false;
        this.showVertices = this.showVertices ? this.showVertices : false;
    }
}