import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { EventNotification } from '../../models/event-notification.model';

@Component({
  selector: 'app-notifications',
  standalone:false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: EventNotification[] = [];
  loading = true;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.loading = true;
    this.notificationService.getUserNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notifications', err);
        this.loading = false;
      }
    });
  }
}
