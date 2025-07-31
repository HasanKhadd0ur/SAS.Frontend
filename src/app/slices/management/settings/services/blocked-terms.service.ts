import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config, Observable } from 'rxjs';
import { BlockedTermDto, CreateBlockedTermDto, UpdateBlockedTermDto } from '../models/blocked-terms.model';
import { ConfigService } from 'src/app/core/services/config/config.service';


@Injectable({
  providedIn: 'root',
})
export class BlockedTermsService {
  private apiUrl = `${this.config.getManagementServiceUrl()}/BlockedTerms`;

  constructor(private http: HttpClient,private config :ConfigService) {}

  getAll(): Observable<BlockedTermDto[]> {
    return this.http.get<BlockedTermDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<BlockedTermDto> {
    return this.http.get<BlockedTermDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateBlockedTermDto): Observable<BlockedTermDto> {
    return this.http.post<BlockedTermDto>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateBlockedTermDto): Observable<BlockedTermDto> {
    return this.http.put<BlockedTermDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
