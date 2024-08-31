import { Component, Input } from '@angular/core';
import { EventResponseDTO } from '../../models/api.response';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input('event') event!:EventResponseDTO;
  @Input('isHome') isHome!:boolean;
}
