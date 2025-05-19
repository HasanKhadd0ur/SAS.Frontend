import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from "rxjs";
import { LayoutService } from '../service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone:false

})
export class AppTopBarComponent implements OnInit{

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    loguedPerson$!: Observable<any>;

    items: MenuItem[] = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => {
                let idPerson: number;
                this.loguedPerson$.subscribe((person: any) => {
                    idPerson = person?.id
                })
            }
        }
    ];

    constructor(
        public layoutService: LayoutService,
        public authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        this.loguedPerson$ = this.authenticationService.loguedPerson$;
    }


}
