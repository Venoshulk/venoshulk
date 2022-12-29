import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import ThreeCanvas from './scripts/three-canvas';

@Component({
  selector: 'app-marching-three-canvas',
  templateUrl: './marching-three-canvas.component.html',
  styleUrls: ['./marching-three-canvas.component.css']
})
export class MarchingThreeCanvasComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvas: ElementRef;
  public threeCanvas: ThreeCanvas | null = null;

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = document.body.clientWidth;
    this.canvas.nativeElement.height = document.body.clientHeight;
    this.threeCanvas = new ThreeCanvas(this.canvas.nativeElement.width, this.canvas.nativeElement.height, this.canvas.nativeElement);
  }

  onResize() {
    this.canvas.nativeElement.width = document.body.clientWidth;
    this.canvas.nativeElement.height = document.body.clientHeight;
    this.threeCanvas?.resize(this.canvas.nativeElement.width, this.canvas.nativeElement.height)
  }
}
