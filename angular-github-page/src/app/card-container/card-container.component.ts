import { Component, Input } from '@angular/core';
import { Card } from '../simple-card/card';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
  @Input() cards: Array<Card>
  @Input() title: string
}
