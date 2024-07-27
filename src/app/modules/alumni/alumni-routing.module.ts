import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';

const routes: Routes = [
  {path:'', component:AlumniListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
