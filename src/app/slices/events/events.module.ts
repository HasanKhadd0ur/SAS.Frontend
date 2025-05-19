import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { DailyEventsComponent } from './dailly-events/dailly-events.component';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    DailyEventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ListboxModule,
    ButtonModule,
  ]
})
export class EventsModule { }
