import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationListComponent } from './components/donation-list/donation-list.component';

const routes: Routes = [
  {path:'', component:DonationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
