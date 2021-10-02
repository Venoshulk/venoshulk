import { context } from "../globals.js";

export class Point{
    constructor(x, y, formula=null){
        this.x = x;
        this.y = y;
        if(formula)
            this.value = formula(x,y);
    }

    setX(x){
        this.x = x;
        return this;
    }

    setY(y){
        this.y = y;
        return this;
    }

    setValue(value){
        this.value = value;
        return this;
    }

    getInterpolatedPoint(point2, factor){
        let x = this.x + factor * Math.abs(this.x - point2.x);
        let y = this.y + factor * Math.abs(this.y - point2.y);
        return new Point(x, y);
    }

    render(iso){
        context.lineWidth = 0.8;
        context.strokeStyle = this.value > iso ? "red" : "black";
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, Math.PI * 2);
        context.stroke();
    }

    drawLine(point2, color="black"){
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineWidth = 3;
        context.setLineDash([5, 15]);
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineTo(point2.x, point2.y);
        context.stroke();
    }
}

export default class MarchingSquare{
    static configurations = [
        [],
        [0,3], // fixed
        [0,1], // fixed
        [1,3], // fixed
        [2,3], //fixed
        [0,2],
        [0,3,1,2], // fixed
        [2,1], // fixed
        [1,2],
        [0,1,2,3], // fixed
        [0,2],
        [2,3],
        [1,3],
        [0,1],
        [0,3], // fixed
        []
    ]

    /**
     * Creates 2d lines out a set of 4 points, based on the marching squares algorithm
     * Src: https://en.wikipedia.org/wiki/Marching_squares 
     * @param {*} points 4 equidistant points, forming a square. Points must be in this order: top left, top right, bottom left, bottom right.
     * @param {*} isolevel A constant value to compare the points' values to.
     * @returns An array containing pairs of points, which, when rendered together, produce a line.
     */
    static polygonise(points, isolevel){
        let configurationIndex = 0;

        if(points[0].value > isolevel) configurationIndex |= 1
        if(points[1].value > isolevel) configurationIndex |= 2
        if(points[2].value > isolevel) configurationIndex |= 4
        if(points[3].value > isolevel) configurationIndex |= 8

        if(configurationIndex === 15 || configurationIndex === 0)
            return [];
        
        let configuredPoints = [];
        for (let i = 0; i < MarchingSquare.configurations[configurationIndex].length; i++) {
            const edge = MarchingSquare.configurations[configurationIndex][i];
            if(edge === 0)
                configuredPoints.push(points[0].getInterpolatedPoint(points[1], 0.5));
            else if(edge === 1)
                configuredPoints.push(points[1].getInterpolatedPoint(points[3], 0.5));
            else if(edge === 2)
                configuredPoints.push(points[2].getInterpolatedPoint(points[3], 0.5));
            else if(edge === 3)
                configuredPoints.push(points[0].getInterpolatedPoint(points[2], 0.5));
        }

        return configuredPoints;
    }
}