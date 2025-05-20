import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: 'daily-events', component: DailyEventsComponent },
  { path: 'view/:id', component: EventDetailComponent }  // new route

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
