import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    pathAuth: string = '/auth/authentication';

    private loguedPerson_: BehaviorSubject<any> = new BehaviorSubject(null);
    loguedPerson$: Observable<any> = this.loguedPerson_.asObservable();

    constructor() { }

    login(payload: { username: string; password: string }, tenant?: string): Observable<any> {
        tenant = tenant ? tenant : "tenant_001";
        const headers = { "X-Tenant-Id": tenant };

        // Simulate an API delay and response
        return of({
            token: 'dummy-jwt-token',
            persona: {
                id: 1,
                name: 'Dummy User',
                username: payload.username,
                tenant: tenant
            }
        }).pipe(
            delay(500), // simulate 500ms network delay
            map(response => {
                this.loguedPerson_.next(response.persona);
                return response;
            })
        );
    }
}
