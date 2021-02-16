import Showcase from './showcase.js';

function main(){
    let show = new Showcase(document.querySelector('.introduction-wrapper canvas'));
    startLazy();
}

window.onload = main;