import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';
import { AlumniDetailsComponent } from './components/alumni-details/alumni-details.component';
import { AuthenticationService } from '../shared/services/authentication.service';

const routes: Routes = [
  {path:'', component:AlumniListComponent},  
  {path:':roll', component:AlumniDetailsComponent, canActivate: [() => inject(AuthenticationService).isLoggedIn()]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
