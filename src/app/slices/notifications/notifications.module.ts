import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
