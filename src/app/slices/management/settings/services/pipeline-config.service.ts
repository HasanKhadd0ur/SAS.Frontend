import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PipelineConfig } from '../models/pipeline-config.model';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({ providedIn: 'root' })
export class PipelineConfigService {

  private baseUrl = `${this.config.getManagementServiceUrl()}/pipelineConfigs`;

  constructor(private http: HttpClient, private config : ConfigService) {}

  getAll(): Observable<PipelineConfig[]> {
    return this.http.get<PipelineConfig[]>(this.baseUrl);
  }

  getById(id: string): Observable<PipelineConfig> {
    return this.http.get<PipelineConfig>(`${this.baseUrl}/${id}`);
  }

  create(dto: PipelineConfig): Observable<string> {
    return this.http.post<string>(this.baseUrl, dto);
  }

  update(dto: PipelineConfig): Observable<void> {
    return this.http.put<void>(this.baseUrl, dto);
  }
}
