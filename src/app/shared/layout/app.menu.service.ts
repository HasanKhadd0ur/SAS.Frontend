import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';
import {MenuItem} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();
    private functionality: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>({} as MenuItem);

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();
    functionality$ = this.functionality.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }

    onFunctionalityChange(menuItem: MenuItem) {
        this.functionality.next(menuItem);
    }
}
