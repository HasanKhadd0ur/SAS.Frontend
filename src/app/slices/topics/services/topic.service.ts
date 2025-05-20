
// topic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../../events/models/topic.model';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private readonly apiUrl = 'https://localhost:44354/api/topics';
  private baseUrl = 'https://localhost:44354/api/';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }
}
