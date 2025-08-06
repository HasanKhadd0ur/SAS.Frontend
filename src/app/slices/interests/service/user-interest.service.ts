import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterest } from '../models/user-interest.model';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Location } from '../models/user-interest.model';

@Injectable({
  providedIn: 'root'
})
export class UserInterestService {
 private apiUrl = `${this.config.getEventServiceUrl()}/userinterests`;

  constructor(private http: HttpClient,
              private config: ConfigService) {}


  /** POST: Create a new interest */
  create(request: { interestName: string; radiusInKm: number; location: Location }): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  /** GET: Fetch all interests */
  getAll(): Observable<UserInterest[]> {
    return this.http.get<UserInterest[]>(this.apiUrl);
  }

  /** GET: Fetch a specific interest by ID */
  getById(id: string): Observable<UserInterest> {
    return this.http.get<UserInterest>(`${this.apiUrl}/${id}`);
  }

  /** DELETE: Remove an interest by ID */
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** PUT: Update interest */
  update(id: string, request: { interestName: string; radiusInKm: number; location: Location }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }

/** GET: Get interests for a specific user */
getMyInterests(): Observable<UserInterest[]> {
  return this.http.get<UserInterest[]>(`${this.apiUrl}/my-interests`);
}
}
