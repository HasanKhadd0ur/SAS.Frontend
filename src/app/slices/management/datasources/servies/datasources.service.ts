import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddDataSourceCommand, DataSource, UpdateDataSourceCommand } from '../models/datasource.model';


@Injectable({
  providedIn: 'root',
})
export class DataSourcesService {
  // Use environment variable here
  private readonly apiUrl = `${environment.SERVER_URL}/DataSources`;

  constructor(private http: HttpClient) {}

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
