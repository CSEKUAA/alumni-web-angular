import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primarynav',
  templateUrl: './primarynav.component.html',
  styleUrl: './primarynav.component.scss'
})
export class PrimarynavComponent {
  @Input('isLoggedIn') isLoggedIn!:boolean;
  
}
