import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrapingTask } from '../models/scraping-task.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ScrapingTasksService {
  private apiUrl = `${this.config.getManagementServiceUrl()}/ScrapingTasks`;

  constructor(private http: HttpClient, private config : ConfigService) {}

  getAllTasks(pageNumber = 1, pageSize = 10): Observable<ScrapingTask[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ScrapingTask[]>(this.apiUrl, { params });
  }
   getTaskById(id: string): Observable<ScrapingTask> {
    return this.http.get<ScrapingTask>(`${this.apiUrl}/${id}`);
  }
}
