import { Component, Input } from '@angular/core';
import ThreeCanvas from '../marching-three-canvas/scripts/three-canvas';
import { Options } from './options';

@Component({
  selector: 'app-marching-cube-options',
  templateUrl: './marching-cube-options.component.html',
  styleUrls: ['./marching-cube-options.component.css']
})
export class MarchingCubeOptionsComponent {
  @Input() threeCanvas: ThreeCanvas | null;
  inputs: Options

  constructor() {
    this.inputs = new Options("noise * 70 - length + 100", 1, 200, 10, false, false)
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.inputs.sanitize();
    this.threeCanvas?.generate(this.inputs.formula, this.inputs.isolevel, this.inputs.totalSize, this.inputs.individualSize, this.inputs.showGrid, this.inputs.showVertices);
  }
}
