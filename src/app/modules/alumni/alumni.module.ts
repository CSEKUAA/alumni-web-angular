import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';


@NgModule({
  declarations: [
    AlumniListComponent
  ],
  imports: [
    CommonModule,
    AlumniRoutingModule
  ]
})
export class AlumniModule { }
