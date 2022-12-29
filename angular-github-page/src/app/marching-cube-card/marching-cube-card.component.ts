import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marching-cube-card',
  templateUrl: './marching-cube-card.component.html',
  styleUrls: ['./marching-cube-card.component.css']
})
export class MarchingCubeCardComponent {
  @Input() name: string;
  @Input() description: string;
}
