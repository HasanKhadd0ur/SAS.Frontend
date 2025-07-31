import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventInfo } from '../models/event.model';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly baseUrl = `${this.config.getEventServiceUrl()}/Events`;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  getAllEvents(pageNumber?: number, pageSize?: number): Observable<Event[]> {
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber);
    if (pageSize) params = params.set('pageSize', pageSize);
    return this.http.get<Event[]>(`${this.baseUrl}`, { params });
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  getEventsByTopic(topic: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/by-topic`, {
      params: new HttpParams().set('topic', topic),
    });
  }

  getEventsByRegion(region: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/by-region`, {
      params: new HttpParams().set('region', region),
    });
  }

  getEventsByArea(lat: number, lng: number, radius: number): Observable<Event[]> {
    const params = new HttpParams()
      .set('Latitude', lat)
      .set('Longitude', lng)
      .set('RadiusInKm', radius);
    return this.http.get<Event[]>(`${this.baseUrl}/area`, { params });
  }

  getEventsUpdatedAfter(date: Date): Observable<Event[]> {
    const params = new HttpParams().set('lastUpdated', date.toISOString());
    return this.http.get<Event[]>(`${this.baseUrl}/updated-after`, { params });
  }

  getEventsCreatedBetween(from: Date, to: Date): Observable<Event[]> {
    const params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString());
    return this.http.get<Event[]>(`${this.baseUrl}/created-between`, { params });
  }

  getEventsByDate(date: Date): Observable<Event[]> {
    const params = new HttpParams().set('date', date.toISOString());
    return this.http.get<Event[]>(`${this.baseUrl}/by-date`, { params });
  }

  getTodaySummary(): Observable<string> {
    return this.http.get(`${this.baseUrl}/summary/today`, {
      responseType: 'text',
    });
  }

  getMessagesByEvent(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${eventId}/messages`);
  }

  getDailyEvent(): Observable<Event[]> {
    const now = new Date();
    const todayMidnight = new Date();
    todayMidnight.setDate(now.getDate() - 2);
    return this.getEventsUpdatedAfter(todayMidnight);
  }

  updateLocation(eventId: string, payload: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${eventId}/location`, payload);
  }

  updateEventInfo(eventId: string, eventInfo: EventInfo): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${eventId}/info`, eventInfo);
  }

  markEventAsReviewed(eventId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${eventId}/review`, {});
  }

  changeEventTopic(eventId: string, topicId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${eventId}/topic`, { topicId });
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}`);
  }

  getEventNamedEntities(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${eventId}/named-entities`);
  }
}
