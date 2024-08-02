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
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PrimarynavComponent } from './components/primarynav/primarynav.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    PrimarynavComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    NgbCarouselModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatAutocompleteModule
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
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    NgbCarouselModule,
    MatMenuModule,
    MatTooltipModule,    
    LoaderComponent,
    MatProgressBarModule,
    MatAutocompleteModule
  ]
})
export class SharedModule { }
