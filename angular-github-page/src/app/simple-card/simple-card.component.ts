import { Component, Input } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})

export class SimpleCardComponent {
  @Input() public card: Card
}
