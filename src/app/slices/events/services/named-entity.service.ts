import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NamedEntity } from '../models/event.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class NamedEntityService {
  private readonly baseUrl = `${this.config.getEventServiceUrl()}/NamedEntities`;

  constructor(private http: HttpClient,private config :ConfigService) {}

  getAll(pageNumber: number, pageSize: number): Observable<NamedEntity[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<NamedEntity[]>(this.baseUrl, { params });
  }
}
