import { generateSimplex, mouseCoordinates } from "../globals.js";
import MarchingSquare, { Point } from "./marchingsquare.js";

export default class MarchingSquaresDemo {
    constructor(context, width, height) {
        this.grid = [];
        this.verticies = [];
        this.isolevel = 0;
        this.noise = generateSimplex(Date.now());
        this.CANVAS_HEIGHT = height
        this.CANVAS_WIDTH = width
        this.context = context

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
    linearMap(valueToMap, currentRangeMin, currentRangeMax, rangeMin, rangeMax) {
        return ((valueToMap - currentRangeMin) / (currentRangeMax - currentRangeMin)) * (rangeMax - rangeMin) + rangeMin;
    }

    generateGrid(startCoords, chunkRange, squareRange, deltaTime) {
        let newGrid = [];
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

    generatePoint(coords, offset) {
        let formula = (x, y) => {
            let distance = Math.sqrt(Math.pow(x - mouseCoordinates.x, 2) + Math.pow(y - mouseCoordinates.y, 2));
            if (distance < 100)
                return 1;
            else
                return this.linearMap(this.noise.noise2D(coords.x + offset.x, coords.y + offset.y), 0, 1, -1, 1) * 0.2;
        }

        return new Point(coords.x, coords.y, formula);
    }

    reDrawPoints(deltaTime) {
        this.verticies = [];
        this.grid = this.generateGrid({ x: 20, y: 20 }, this.CANVAS_WIDTH, 50, deltaTime);
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

        this.lastMouseCoords.x = mouseCoordinates.x;
        this.lastMouseCoords.y = mouseCoordinates.y;

        // Draw the new lines
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        for (let i = 0; i < this.verticies.length; i += 2) {
            this.verticies[i].drawLine(this.verticies[i + 1], "cornflowerblue");
        }
    }

    render(now) {
        // Update delta time
        const deltaTime = (now - this.lastTime) / 1000; // Milliseconds -> seconds
        this.lastTime = now;


        this.update(deltaTime);

        requestAnimationFrame(this.render);
    }

    update(dt) {
        this.reDrawTimeCounter += dt;

        if (this.reDrawTimeCounter >= this.reDrawTimeInterval) {
            this.reDrawPoints(dt);
            this.offSetAddUp += 0.01;
            this.reDrawTimeCounter = 0;
        } else if (this.lastMouseCoords.x !== mouseCoordinates.x && this.lastMouseCoords.y !== mouseCoordinates.y) {
            this.reDrawPoints(dt);
        }
    }

    renderPoint(iso) {
        this.context.lineWidth = 0.8;
        this.context.strokeStyle = this.value > iso ? "red" : "black";
        this.context.beginPath();
        this.context.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.context.stroke();
    }

    drawLine(point1, point2, color = "black") {
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