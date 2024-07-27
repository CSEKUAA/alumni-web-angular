import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DonationListComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedModule
  ]
})
export class DonationModule { }
