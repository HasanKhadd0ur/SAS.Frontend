import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { Scraper } from '../models/scraper.model';

@Injectable({
  providedIn: 'root'  
})
export class ScraperService {
  
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getManagementServiceUrl()}/Scrapers`;
  }
  getScrapers(): Observable<Scraper[]> {
    return this.http.get<Scraper[]>(`${this.apiUrl}`);
  }

}
