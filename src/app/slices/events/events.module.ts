import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

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
import { NamedEntityEventsComponent } from './named-entity-events/named-entity-events.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventReviewsComponent } from './components/event-reviews/event-reviews.component';
import { EventNamedEntitiesComponent } from './components/event-named-entities/event-named-entities.component';
import { EventMessagesComponent } from './components/event-messages/event-messages.component';
import { EventReviewFormComponent } from './components/event-review-form/event-review-form.component';
import { HttpClientModule } from '@angular/common/http';
import { EventRangeComponent } from './event-range/event-range.component';
import { EventsByAreaComponent } from './events-by-area/events-by-area.component';
import { EventsDomainsComponent } from './events-domains/events-domains.component';
import { EventsByDomainComponent } from './events-by-domain/events-by-domain.component';
import { MapBydomainComponent } from './map-bydomain/map-bydomain.component';


@NgModule({
  declarations: [
    DailyEventsComponent,
    EventDetailComponent,
    EventHistoryComponent,
    TodaySummaryComponent,
    TopicEventsComponent,
    UpdateEventLocationComponent,
    UpdateEventInfoComponent,
    NamedEntityComponent,
    NamedEntityEventsComponent,
    EventItemComponent,
    EventReviewsComponent,
    EventNamedEntitiesComponent,
    EventMessagesComponent,
    EventReviewFormComponent,
    EventRangeComponent,
    EventsByAreaComponent,
    EventsDomainsComponent,
    EventsByDomainComponent,
    MapBydomainComponent
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
    HttpClientModule,
    MarkdownModule.forRoot(),
    InfiniteScrollModule,
    ButtonModule,
  ]
})
export class EventsModule { }
