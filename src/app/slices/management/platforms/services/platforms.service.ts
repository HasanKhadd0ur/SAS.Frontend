// src/app/services/platform.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '../models/platforms.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly apiUrl = `${environment.SERVER_URL}/Platforms`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<Platform[]> {
    let params: any = {};
    if (pageNumber) params.pageNumber = pageNumber;
    if (pageSize) params.pageSize = pageSize;
    return this.http.get<Platform[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<Platform> {
    return this.http.get<Platform>(`${this.apiUrl}/${id}`);
  }
}
