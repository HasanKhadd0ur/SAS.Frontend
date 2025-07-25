import {Injectable} from '@angular/core';
import { CryptojsService } from '../cryptojs/cryptojs.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private cryptojsService: CryptojsService) {
    }

    setLocalStorage(key: string, data: any) {
        if (localStorage.getItem(key)) {
            console.error(`The key '${key}' already exists in localStorage.`);
            return;
        }
        const dataString = JSON.stringify(data);
        const encryptedData = this.cryptojsService.encrypt(dataString);
        localStorage.setItem(key, encryptedData);
    }

    getLocalStorage(key: string) {
        const encryptedData = localStorage.getItem(key);
        if (encryptedData) {
            const decryptedData = this.cryptojsService.decrypt(encryptedData);
            return JSON.parse(decryptedData);
        }
        return null;
    }

    removeLocalStorageItem(key: string) {
        localStorage.removeItem(key);
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    setSessionStorage(key: string, data: any) {
        if (sessionStorage.getItem(key)) {
            console.error(`The key '${key}' already exists in sessionStorage.`);
            return;
        }
        const dataString = JSON.stringify(data);
        const encryptedData = this.cryptojsService.encrypt(dataString);
        sessionStorage.setItem(key, encryptedData);
    }

    getSessionStorage(key: string) {
        const encryptedData = sessionStorage.getItem(key);
        if (encryptedData) {
            const decryptedData = this.cryptojsService.decrypt(encryptedData);
            return JSON.parse(decryptedData);
        }
        return null;
    }

    removeSessionStorageItem(key: string) {
        sessionStorage.removeItem(key);
    }

    clearSessionStorage() {
        sessionStorage.clear();
    }

    getToken(): string {
        // const token = this.getSessionStorage('token') || this.getLocalStorage('token');
        const token= this.getLocalStorage('token');
        return token ? token : null;
    }

    clearAndSetItemInLocalStorage(key: string, value: any) {
        this.removeLocalStorageItem(key);
        this.setLocalStorage(key, value);
    }

    clearAndSetItemInSessionStorage(key: string, value: any) {
        this.removeSessionStorageItem(key);
        this.setSessionStorage(key, value);
    }
}
