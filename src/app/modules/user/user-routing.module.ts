import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MembershipInfoComponent } from './components/membership-info/membership-info.component';

const routes: Routes = [
  { path:'profile', component: UserProfileComponent},
  { path: 'update/:id', component:UpdateProfileComponent},
  { path: 'membership', component: MembershipInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
