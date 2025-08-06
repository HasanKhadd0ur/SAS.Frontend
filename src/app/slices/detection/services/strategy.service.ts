import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  private apiBase = `${this.config.getDetectionServiceUrl()}/config`; 

  constructor(private http: HttpClient,private config :ConfigService) {}

  getAvailableStrategies(): Observable<{ available_strategies: string[] }> {
    return this.http.get<{ available_strategies: string[] }>(`${this.apiBase}/list-strategies`);
  }

  getCurrentStrategy(): Observable<{ current_strategy: string }> {
    return this.http.get<{ current_strategy: string }>(`${this.apiBase}/get-strategy`);
  }

  setStrategy(strategyName: string): Observable<any> {
    return this.http.post(`${this.apiBase}/set-strategy`, { strategy_name: strategyName });
  }
}
