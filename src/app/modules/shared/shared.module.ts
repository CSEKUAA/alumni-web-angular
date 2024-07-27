import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';


import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PrimarynavComponent } from './components/primarynav/primarynav.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    PrimarynavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    NgbCarouselModule,
    MatMenuModule
  ],
  exports:[
    MatToolbarModule,
    FooterComponent,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    SidenavComponent,
    PrimarynavComponent,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    NgbCarouselModule,
    MatMenuModule
  ]
})
export class SharedModule { }
