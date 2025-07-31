import { Injectable } from '@angular/core';
import { StorageService } from './storage-service/storage.service';
import { User } from '../models/response/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_KEY = 'user';
  public static readonly ROLE_MONITOR = 'Monitor';
  constructor(private storageService: StorageService) {}

  getCurrentUser(): User | null {
    const user = this.storageService.getLocalStorage(this.USER_KEY);
    return user ? user as User : null;
  }

  getFullName(): string {
    const user = this.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  getEmail(): string {
    const user = this.getCurrentUser();
    return user?.email || '';
  }

  getToken(): string {
    const user = this.getCurrentUser();
    return user?.token || '';
  }

  getRoles(): string[] {
    const user = this.getCurrentUser();
    return (user?.roles || [] ).map(e => e.name);
  }
}
