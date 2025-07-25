import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private storageService :StorageService) {}

  getToken(): string | null {
    return this.storageService.getToken();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      if (!exp) return true;

      const now = Math.floor(new Date().getTime() / 1000);
      return exp < now;
    } catch (err) {
      return true;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.unique_name || decoded?.username || null;
    } catch {
      return null;
    }
  }
}