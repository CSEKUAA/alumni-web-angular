import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MembershipInfoComponent } from './components/membership-info/membership-info.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateProfileComponent,
    MembershipInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
