import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { TodaySummaryComponent } from './today-summary/today-summary.component';
import { EventHistoryComponent } from './event-history/event-history.component';

const routes: Routes = [
  { path: 'daily-events', component: DailyEventsComponent },
  { path: 'view/:id', component: EventDetailComponent },
  { path: 'history', component: EventHistoryComponent },
  { path: 'today/summary', component: TodaySummaryComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
