import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { AuthenticationService } from '../shared/services/authentication.service';

const routes: Routes = [
  { path:'', component:EventListComponent },
  { path:'create', component:CreateEventComponent, canActivate: [() => inject(AuthenticationService).isLoggedInAndAdmin()] },
  { path:':eventId', component:EventDetailsComponent },
  { path:':eventId/update', component:UpdateEventComponent, canActivate: [() => inject(AuthenticationService).isLoggedInAndAdmin()] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
