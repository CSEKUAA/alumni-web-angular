import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobCircularRoutingModule } from './job-circular-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobListComponent
  ],
  imports: [
    CommonModule,
    JobCircularRoutingModule,
    SharedModule
  ]
})
export class JobCircularModule { }
