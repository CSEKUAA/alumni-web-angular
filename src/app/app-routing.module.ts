import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './modules/shared/services/authentication.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'alumni',
    loadChildren: () => import('./modules/alumni/alumni.module').then(m => m.AlumniModule)
  },
  {
    path: 'donation',
    loadChildren: () => import('./modules/donation/donation.module').then(m => m.DonationModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./modules/job-circular/job-circular.module').then(m => m.JobCircularModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user', canActivate: [() => inject(AuthenticationService).isLoggedIn()],
    loadChildren: () => import('./modules/user/user.module').then(m=>m.UserModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }