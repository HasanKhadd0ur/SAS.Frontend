import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddDataSourceTypeCommand, DataSourceType } from '../models/datasource-type.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceTypeService {
  private readonly apiUrl = `${this.config.getManagementServiceUrl()}/DataSourceTypes`;

  constructor(private http: HttpClient,
              private config: ConfigService) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<DataSourceType[]> {
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber.toString());
    if (pageSize) params = params.set('pageSize', pageSize.toString());

    return this.http.get<DataSourceType[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<DataSourceType> {
    return this.http.get<DataSourceType>(`${this.apiUrl}/${id}`);
  }

  add(command: AddDataSourceTypeCommand): Observable<string> {
    return this.http.post<string>(this.apiUrl, command);
  }
}
