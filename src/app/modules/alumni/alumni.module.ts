import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniListComponent } from './components/alumni-list/alumni-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AlumniDetailsComponent } from './components/alumni-details/alumni-details.component';


@NgModule({
  declarations: [
    AlumniListComponent,
    AlumniDetailsComponent
  ],
  imports: [
    CommonModule,
    AlumniRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatSortModule
  ]
})
export class AlumniModule { }
