import SimplexNoise from 'simplex-noise'
import MarchingSquaresDemo from "./showcase/showcase.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d');
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
export const generateSimplex = function (seed = null) {
    return !seed ? new SimplexNoise() : new SimplexNoise(seed);
}
export let mouseCoordinates = {
    x: 0,
    y: 0
}

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = event.clientX - rect.left;
    mouseCoordinates.y = event.clientY - rect.top;
});

canvas.addEventListener('touchmove', (event) => {
    let rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = event.touches[0].clientX - rect.left;
    mouseCoordinates.y = event.touches[0].clientY - rect.top;
});

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let canvasContainer = document.querySelector('#canvas-container');
canvasContainer.insertBefore(canvas, canvasContainer.firstChild);
let showcase = new MarchingSquaresDemo();