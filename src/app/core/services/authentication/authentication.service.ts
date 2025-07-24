import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginRequest } from '../../models/requests/login.request';
import { RegisterRequest } from '../../models/requests/register.request';
import { AuthResponse } from '../../models/response/AuthResponse';
import { ConfigService } from '../config/config.service';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    pathAuth: string = '/auth/authentication';

    private loguedPerson_: BehaviorSubject<any> = new BehaviorSubject(null);
    private readonly apiUrl =  `${this.config.getApiUrl()}/identity/api/Auth`;
    loguedPerson$: Observable<any> = this.loguedPerson_.asObservable();


    constructor(
      private http: HttpClient,
      private config: ConfigService,
      private router: Router,
      private messageService: MessageService
    ) {}
    login(data: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
    }
    
    externalLogin(): Observable<AuthResponse> {
      return this.http.get<AuthResponse>(`${this.apiUrl}/signin-google`);
    }

    logout(): void {
        // Clear any stored tokens or user data
        localStorage.removeItem('token');         // if you store a JWT
        localStorage.removeItem('user');          // if you store user info
        sessionStorage.clear();                   // optionally clear session storage
        localStorage.clear();                      // optionally clear local storage


        // Show goodbye toast
        this.messageService.add({
          severity: 'info',
          summary: 'Goodbye 👋',
          detail: 'You have been logged out successfully.',
          life: 3000
        });

        // Navigate to login 
        this.router.navigate(['']);
      }
}