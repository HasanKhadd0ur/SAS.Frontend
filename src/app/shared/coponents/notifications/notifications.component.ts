
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-notifications',
  standalone:false,
  template: ''
})
export class NotificationsComponent implements OnInit, OnDestroy {
  eventId: string | null = null;

  constructor(private notificationService: NotificationService,private tokenService :TokenService, private messageService: MessageService) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken() || '';

    this.notificationService.startConnection(token);

    this.notificationService.addEventNearbyListener((data) => {
      console.log('Received EventNearby notification:', data);
      this.eventId = data.eventId || data.EventId;
       this.messageService.add({
        severity: 'info',
        summary: `New Event in your ineterests region`,
        detail: `${data.title}`,
        life: 60000,
      });
    });
    
  }

  ngOnDestroy(): void {
    this.notificationService.stopConnection();
  }
}