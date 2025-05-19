import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';

const routes: Routes = [
  { path: 'daily-events', component: DailyEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
