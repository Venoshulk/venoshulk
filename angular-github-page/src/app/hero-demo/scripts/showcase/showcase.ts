import MarchingSquare, { Point } from "./marchingsquare.js";

export default class MarchingSquaresDemo {
    grid: Array<Array<Point>>;
    verticies: Array<Point>;
    isolevel: number;
    noise: any;
    CANVAS_HEIGHT: number;
    CANVAS_WIDTH: number;
    context: CanvasRenderingContext2D;
    reDrawTimeCounter: number;
    reDrawTimeInterval: number;
    offSetAddUp: number;
    mouseCoordinates: { x: number; y: number; };
    lastMouseCoords: { x: number; y: number; };
    lastTime: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number, mouseCoordinates: { x: number, y: number }, noise: any) {
        this.grid = [];
        this.verticies = [];
        this.isolevel = 0;
        this.noise = noise;
        this.CANVAS_HEIGHT = height
        this.CANVAS_WIDTH = width
        this.context = context
        this.mouseCoordinates = mouseCoordinates;

        this.render = this.render.bind(this);

        this.reDrawTimeCounter = 0;
        this.reDrawTimeInterval = 0.5; // 5 seconds
        this.offSetAddUp = 0;

        this.lastMouseCoords = {
            x: 0,
            y: 0
        }

        this.lastTime = 0;
        this.reDrawPoints();
        requestAnimationFrame(this.render);
    }

    /**
     * Maps a value from one range to another.
     * @param {*} valueToMap The value to map.
     * @param {*} currentRangeMin The current minimum value in the range
     * @param {*} currentRangeMax The current maximum value in the range
     * @param {*} rangeMin The new range's minimum 
     * @param {*} rangeMax The new range's maximum
     * @returns A value between rangeMin and rangeMax, based on valueToMap in it's previous range.
     */
    linearMap(valueToMap: number, currentRangeMin: number, currentRangeMax: number, rangeMin: number, rangeMax: number) {
        return ((valueToMap - currentRangeMin) / (currentRangeMax - currentRangeMin)) * (rangeMax - rangeMin) + rangeMin;
    }

    generateGrid(startCoords: { x: any; y: any; }, chunkRange: number, squareRange: number) {
        let newGrid: Array<Array<Point>> = [];
        let offsetY = 0;
        let amountOfPoints = chunkRange / squareRange;

        for (let x = 0; x < amountOfPoints; x++) {
            newGrid[x] = [];
            let offsetX = 0;
            for (let y = 0; y < amountOfPoints; y++) {
                newGrid[x].push(this.generatePoint(
                    { x: startCoords.x + squareRange * x, y: startCoords.y + squareRange * y },
                    { x: offsetX, y: offsetY }
                ));
                offsetX += 0.001 + this.offSetAddUp;
            }
            offsetY += 0.001 + this.offSetAddUp;
        }

        return newGrid;
    }

    generatePoint(coords: { x: any; y: any; }, offset: { x: any; y: any; }) {
        let formula = (x: number, y: number) => {
            let distance = Math.sqrt(Math.pow(x - this.mouseCoordinates.x, 2) + Math.pow(y - this.mouseCoordinates.y, 2));
            if (distance < 100)
                return 1;
            else
                return this.linearMap(this.noise(coords.x + offset.x, coords.y + offset.y), 0, 1, -1, 1) * 0.2;
        }

        return new Point(coords.x, coords.y, formula);
    }

    reDrawPoints() {
        this.verticies = [];
        this.grid = this.generateGrid({ x: 20, y: 20 }, this.CANVAS_WIDTH, 50);
        for (let x = 0; x < this.grid.length - 1; x++) {
            for (let y = 0; y < this.grid[x].length - 1; y++) {
                this.verticies.push(...MarchingSquare.polygonise([
                    this.grid[x][y],
                    this.grid[x + 1][y],
                    this.grid[x][y + 1],
                    this.grid[x + 1][y + 1]
                ], this.isolevel));
            }
        }

        this.lastMouseCoords.x = this.mouseCoordinates.x;
        this.lastMouseCoords.y = this.mouseCoordinates.y;

        // Draw the new lines
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        for (let i = 0; i < this.verticies.length; i += 2) {
            this.drawLine(this.verticies[i], this.verticies[i + 1], "cornflowerblue");
        }
    }

    render(now: number) {
        // Update delta time
        const deltaTime = (now - this.lastTime) / 1000; // Milliseconds -> seconds
        this.lastTime = now;


        this.update(deltaTime);

        requestAnimationFrame(this.render);
    }

    update(dt: number) {
        this.reDrawTimeCounter += dt;

        if (this.reDrawTimeCounter >= this.reDrawTimeInterval) {
            this.reDrawPoints();
            this.offSetAddUp += 0.01;
            this.reDrawTimeCounter = 0;
        } else if (this.lastMouseCoords.x !== this.mouseCoordinates.x && this.lastMouseCoords.y !== this.mouseCoordinates.y) {
            this.reDrawPoints();
        }
    }

    renderPoint(point: Point, iso: number) {
        this.context.lineWidth = 0.8;
        // @ts-ignore: Object is possibly 'null'.
        this.context.strokeStyle = point.value > iso ? "red" : "black";
        this.context.beginPath();
        this.context.arc(point.x, point.y, 2, 0, Math.PI * 2);
        this.context.stroke();
    }

    drawLine(point1: Point, point2: Point, color: string = "black") {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineWidth = 3;
        this.context.setLineDash([5, 15]);
        this.context.lineCap = "round";
        this.context.strokeStyle = color;
        this.context.lineTo(point2.x, point2.y);
        this.context.stroke();
    }
}