
// topic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../../events/models/topic.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private readonly apiUrl = `${this.config.getEventServiceUrl()}/topics`;

  constructor(private http: HttpClient,
              private config: ConfigService  ) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }
}
