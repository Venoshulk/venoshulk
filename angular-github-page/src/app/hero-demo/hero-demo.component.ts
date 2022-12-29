import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import MarchingSquaresDemo from './scripts/showcase/showcase';
import { createNoise2D } from 'simplex-noise';

@Component({
  selector: 'app-hero-demo',
  templateUrl: './hero-demo.component.html',
  styleUrls: ['./hero-demo.component.css']
})
export class HeroDemoComponent implements AfterViewInit {
  @ViewChild('demo_canvas')
  demoCanvas: ElementRef<HTMLCanvasElement>;

  @Input() public canvas_width: number = 500
  @Input() public canvas_height: number = 500
  private mouseCoordinates: { x: number, y: number } = {
    x: 0,
    y: 0
  }

  private ctx: CanvasRenderingContext2D;
  private showcase: MarchingSquaresDemo;

  ngAfterViewInit(): void {
    // @ts-ignore: Object is possibly 'null'.
    this.ctx = this.demoCanvas.nativeElement.getContext('2d');
    this.showcase = new MarchingSquaresDemo(this.ctx, this.canvas_width, this.canvas_height, this.mouseCoordinates, createNoise2D());
  }

  mouseMove(event: MouseEvent) {
    let rect = this.demoCanvas.nativeElement.getBoundingClientRect();
    this.mouseCoordinates.x = event.clientX - rect.left;
    this.mouseCoordinates.y = event.clientY - rect.top;
  }

  touchMove(event: TouchEvent) {
    let rect = this.demoCanvas.nativeElement.getBoundingClientRect();
    this.mouseCoordinates.x = event.touches[0].clientX - rect.left;
    this.mouseCoordinates.y = event.touches[0].clientY - rect.top;
  }
}
