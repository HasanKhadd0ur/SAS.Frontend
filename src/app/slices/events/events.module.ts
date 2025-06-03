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
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DailyEventsComponent,
    EventDetailComponent,
    EventHistoryComponent
  ],
  imports: [
    CommonModule,
     FormsModule, 
    EventsRoutingModule,
    ListboxModule,
    TableModule,
    CardModule,		
    MenubarModule,
    CalendarModule,
    TagModule,
    InfiniteScrollModule,
    ButtonModule,
  ]
})
export class EventsModule { }
