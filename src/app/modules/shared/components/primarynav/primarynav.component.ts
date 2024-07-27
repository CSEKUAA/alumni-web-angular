import { Component, Input } from '@angular/core';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-primarynav',
  templateUrl: './primarynav.component.html',
  styleUrl: './primarynav.component.scss'
})
export class PrimarynavComponent {
  @Input('isLoggedIn') isLoggedIn!:boolean;

  constructor(private authService:IdentityService){}
  
  onLogout(){
    this.authService.logout().subscribe({
      next: (()=>{        
        window.location.href = window.location.origin;
      })
    })
  }
}
