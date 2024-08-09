import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MembershipInfoComponent } from './components/membership-info/membership-info.component';
import { SharedModule } from '../shared/shared.module';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ExternalLinksComponent } from './components/external-links/external-links.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateProfileComponent,
    MembershipInfoComponent,
    UpdatePasswordComponent,
    ExternalLinksComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
