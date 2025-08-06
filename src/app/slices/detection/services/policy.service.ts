import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';

export interface PolicyRule {
  name: string;
  value: any;
  description: string;
  enabled:boolean;
}

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private apiUrl = `${this.config.getDetectionServiceUrl()}/policy`;

  constructor(private http: HttpClient, private config :ConfigService) {}

  getAllRules(): Observable<PolicyRule[]> {
    return this.http.get<PolicyRule[]>(`${this.apiUrl}/`);
  }

  getRule(name: string): Observable<PolicyRule> {
    return this.http.get<PolicyRule>(`${this.apiUrl}/${name}`);
  }

  updateRule(name: string, value: any): Observable<PolicyRule> {
    return this.http.post<PolicyRule>(`${this.apiUrl}/`, { name, value });
  }
  toggleRule(name: string, enabled: boolean): Observable<PolicyRule> {
  return this.http.post<PolicyRule>(`${this.apiUrl}/toggle`, { name, enabled });
}

}