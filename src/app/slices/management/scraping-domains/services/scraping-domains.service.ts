// src/app/scraping-domains/scraping-domain.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';  // Import environment
import { ScrapingDomain, CreateScrapingDomainCommand, UpdateScrapingDomainCommand } from '../models/scraping-domains.model';


@Injectable({
  providedIn: 'root'
})
export class ScrapingDomainsService {
  // Use SERVER_URL from environment
  private baseUrl = `${environment.SERVER_URL}/scrapingdomains`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<ScrapingDomain[]> {
    let url = this.baseUrl;
    const params: any = {};
    if (pageNumber) params.pageNumber = pageNumber;
    if (pageSize) params.pageSize = pageSize;

    return this.http.get<ScrapingDomain[]>(url, { params });
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
