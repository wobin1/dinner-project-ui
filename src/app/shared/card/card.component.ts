import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() qrcodeContent!: string;
  @Input() guestName!: string;
  @Input() tableType!: string;

}
