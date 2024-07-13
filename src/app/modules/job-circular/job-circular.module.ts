import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobCircularRoutingModule } from './job-circular-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';


@NgModule({
  declarations: [
    JobListComponent
  ],
  imports: [
    CommonModule,
    JobCircularRoutingModule
  ]
})
export class JobCircularModule { }
