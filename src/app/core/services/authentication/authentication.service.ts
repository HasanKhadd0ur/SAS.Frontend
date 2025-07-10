import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoginRequest } from '../../models/requests/login.request';
import { RegisterRequest } from '../../models/requests/register.request';
import { AuthResponse } from '../../models/response/AuthResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    pathAuth: string = '/auth/authentication';

    private loguedPerson_: BehaviorSubject<any> = new BehaviorSubject(null);
    private readonly apiUrl = 'https://localhost:5010/identity/api/Auth';
    loguedPerson$: Observable<any> = this.loguedPerson_.asObservable();

    constructor(private http: HttpClient) {}

    login(data: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
    }
    
    externalLogin(): Observable<AuthResponse> {
      return this.http.get<AuthResponse>(`${this.apiUrl}/signin-google`);
    }

}