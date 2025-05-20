import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'https://localhost:44354/api/events';

  constructor(private http: HttpClient) {}

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

  getMessagesByEvent(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${eventId}/messages`);
  }
  getDailyEvent():Observable<Event[]>{
    const now = new Date();

    const todayMidnight = new Date();
  
    todayMidnight.setDate(now.getDate() - 2); // set to start of today


    return this.getEventsUpdatedAfter(todayMidnight);

  }
}
