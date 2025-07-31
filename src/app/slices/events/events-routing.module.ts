import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { TodaySummaryComponent } from './today-summary/today-summary.component';
import { EventHistoryComponent } from './event-history/event-history.component';
import { TopicEventsComponent } from './topic-events/topic-events.component';
import { UpdateEventLocationComponent } from './update-event-location/update-event-location.component';
import { UpdateEventInfoComponent } from './update-event-info/update-event-info.component';
import { NamedEntityComponent } from './named-entity/named-entity.component';

const routes: Routes = [
  { path: 'daily-events', component: DailyEventsComponent },
  { path: 'view/:id', component: EventDetailComponent },
  { path: 'history', component: EventHistoryComponent },
  { path: 'today/summary', component: TodaySummaryComponent },
  { path: 'topic-events', component: TopicEventsComponent },
  { path: ':eventId/location',  component: UpdateEventLocationComponent,},
  { path: ':eventId/update-info',  component: UpdateEventInfoComponent,},
  { path: 'entities',  component: NamedEntityComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
