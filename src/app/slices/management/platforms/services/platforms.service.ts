// src/app/services/platform.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '../models/platforms.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getManagementServiceUrl()}/Platforms`;
  }

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
