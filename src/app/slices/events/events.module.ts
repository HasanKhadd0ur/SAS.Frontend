import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventHistoryComponent } from './event-history/event-history.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodaySummaryComponent } from './today-summary/today-summary.component';
import { MarkdownModule } from 'ngx-markdown';
import { TopicEventsComponent } from './topic-events/topic-events.component';
import { UpdateEventLocationComponent } from './update-event-location/update-event-location.component';
import { UpdateEventInfoComponent } from './update-event-info/update-event-info.component';
import { NamedEntityComponent } from './named-entity/named-entity.component';


@NgModule({
  declarations: [
    DailyEventsComponent,
    EventDetailComponent,
    EventHistoryComponent,
    TodaySummaryComponent,
    TopicEventsComponent,
    UpdateEventLocationComponent,
    UpdateEventInfoComponent,
    NamedEntityComponent
  ],
  imports: [
    CommonModule,
     FormsModule, 
    EventsRoutingModule,
    ListboxModule,
    TableModule,
    ReactiveFormsModule,
    CardModule,		
    MenubarModule,
    CalendarModule,
    TagModule,
    MarkdownModule.forRoot(),
    InfiniteScrollModule,
    ButtonModule,
  ]
})
export class EventsModule { }
