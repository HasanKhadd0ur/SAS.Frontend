import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone:false

})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
                ]
            },
            {
                label: 'Map',
                items: [
                    { label: 'Live Map', icon: 'pi pi-fw pi-id-card', routerLink: ['/map/live'] },
                    { label: 'Daily Eevents', icon: 'pi pi-fw pi-check-square', routerLink: ['/events/daily-events'] },
                    { label: 'Near Me', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'What Happpen Today', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Back to History', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'discusing', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                ]
            },
            {
                label: 'Topics',
                items: [
                    { label: 'Topic Map', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'My Intereset', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Regions',
                items: [
                    { label: 'My Region Intereset', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'Regions', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            
            {
                label: 'Events',
                items: [
                    {
                        label: 'Reports',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Ask LLM',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Feed Back',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
               ]
            },
            {
                label: 'Alerts',
                items: [
                    { label: 'Alters', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                ]
            },
            {
                label: 'Notification',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Notification',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Box',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Event Notification',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Messages',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            }
                        ]
                    }
                  ]
                },
             {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
