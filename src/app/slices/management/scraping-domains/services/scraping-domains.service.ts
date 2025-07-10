import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScrapingDomain, CreateScrapingDomainCommand, UpdateScrapingDomainCommand } from '../models/scraping-domains.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ScrapingDomainsService {
  private baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = `${this.configService.getManagementServiceUrl()}/scrapingdomains`;
  }

  getAll(pageNumber?: number, pageSize?: number): Observable<ScrapingDomain[]> {
    const params: any = {};
    if (pageNumber) params.pageNumber = pageNumber;
    if (pageSize) params.pageSize = pageSize;

    return this.http.get<ScrapingDomain[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<ScrapingDomain> {
    return this.http.get<ScrapingDomain>(`${this.baseUrl}/${id}`);
  }

  create(command: CreateScrapingDomainCommand): Observable<string> {
    return this.http.post<string>(this.baseUrl, command);
  }

  update(id: string, command: UpdateScrapingDomainCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, command);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
