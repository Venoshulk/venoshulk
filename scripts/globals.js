import { startLazy } from "./lazyLoad.js";
import simplexNoise from 'https://cdn.skypack.dev/simplex-noise';
import MarchingSquaresDemo from "./showcase/showcase.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d');
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
export const generateSimplex = function(seed=null){
    return !seed ? new simplexNoise() : new simplexNoise(seed);
}
export let mouseCoordinates = {
    x: 0,
    y: 0
}

canvas.addEventListener('mousemove', (event)=>{
    let rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = event.clientX - rect.left;
    mouseCoordinates.y = event.clientY - rect.top;
});

canvas.addEventListener('touchmove', (event)=>{
    let rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = event.touches[0].clientX - rect.left;
    mouseCoordinates.y = event.touches[0].clientY - rect.top;
});

startLazy();
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let canvasContainer = document.querySelector('#canvas-container');
canvasContainer.insertBefore(canvas, canvasContainer.firstChild);
let showcase = new MarchingSquaresDemo();