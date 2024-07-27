import { Component, Input } from '@angular/core';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
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
