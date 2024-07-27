import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AlumniListComponent
  ],
  imports: [
    CommonModule,
    AlumniRoutingModule,
    SharedModule
  ]
})
export class AlumniModule { }
