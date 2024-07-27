import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IdentityService } from './modules/shared/services/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'alumni-web-angular';  
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router:Router, private authService:IdentityService){}
  
  isLoggedIn!:boolean;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.hasValidAccessToken();
  }

  ngAfterViewInit() {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.sidenav.opened) {
        this.sidenav.toggle();
      }
    });
  }
}
