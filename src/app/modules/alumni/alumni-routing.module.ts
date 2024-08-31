import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';
import { AlumniDetailsComponent } from './components/alumni-details/alumni-details.component';

const routes: Routes = [
  {path:'', component:AlumniListComponent},  
  {path:':alumniId', component:AlumniDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
