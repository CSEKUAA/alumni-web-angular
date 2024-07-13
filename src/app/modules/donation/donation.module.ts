import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { DonationListComponent } from './components/donation-list/donation-list.component';


@NgModule({
  declarations: [
    DonationListComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule
  ]
})
export class DonationModule { }
