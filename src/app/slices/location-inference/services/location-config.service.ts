import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationConfigService {
  private baseUrl = `${this.config.getLocationInferenceServiceUrl()}/config/location-services`;

  constructor(private http: HttpClient, private config: ConfigService) {}

  getAvailableServices(): Observable<{ recognizers: string[]; resolvers: string[] }> {
    const recognizers$ = this.http.get<{ recognizers: string[] }>(`${this.baseUrl}/recognizers`);
    const resolvers$ = this.http.get<{ resolvers: string[] }>(`${this.baseUrl}/resolvers`);

    return forkJoin([recognizers$, resolvers$]).pipe(
      map(([recognizersRes, resolversRes]) => ({
        recognizers: recognizersRes.recognizers,
        resolvers: resolversRes.resolvers,
      }))
    );
  }

  getCurrentConfig(): Observable<{ recognizer_key: string; resolver_key: string }> {
    return this.http.get<{ recognizer_key: string; resolver_key: string }>(`${this.baseUrl}/config`);
  }

  updateConfig(data: { recognizer_key?: string; resolver_key?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/config`, data);
  }
}
