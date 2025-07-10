import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddDataSourceCommand, DataSource, UpdateDataSourceCommand } from '../models/datasource.model';
import { ConfigService } from 'src/app/core/services/config/config.service';


@Injectable({
  providedIn: 'root',
})
export class DataSourcesService {

  private readonly apiUrl = `${this.config.getManagementServiceUrl()}/DataSources`;

  constructor(private http: HttpClient,
              private config: ConfigService) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<DataSource[]> {
    let params = new HttpParams();
    if (pageNumber !== undefined) params = params.set('pageNumber', pageNumber.toString());
    if (pageSize !== undefined) params = params.set('pageSize', pageSize.toString());

    return this.http.get<DataSource[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<DataSource> {
    return this.http.get<DataSource>(`${this.apiUrl}/${id}`);
  }

  add(command: AddDataSourceCommand): Observable<DataSource> {
    return this.http.post<DataSource>(this.apiUrl, command);
  }

  update(id: string, command: UpdateDataSourceCommand): Observable<DataSource> {
    return this.http.put<DataSource>(`${this.apiUrl}/${id}`, command);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
