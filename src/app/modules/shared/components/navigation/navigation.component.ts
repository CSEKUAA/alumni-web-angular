import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  isLoggedIn!:boolean;
  isResponsiveMenuOpened!:boolean;

  onToggleMenuState(){
    this.isResponsiveMenuOpened=!this.isResponsiveMenuOpened;
  }

  onLogout(){

  }

}
