import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';

export interface EventNotificationDTO {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
  isRead: boolean;
  eventId: string;
  title: string;
  interestName: string;
  latitude: number;
  longitude: number;
  occurredAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = `${this.config.getEventServiceUrl()}/notifications/my`;

  constructor(private http: HttpClient,private config :ConfigService) {}

  getUserNotifications(pageNumber: number = 1, pageSize: number = 10): Observable<EventNotificationDTO[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<EventNotificationDTO[]>(this.API_URL, { params });
  }
}
