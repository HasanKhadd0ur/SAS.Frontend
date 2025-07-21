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
                    { label: 'Daily Events', icon: 'pi pi-fw pi-check-square', routerLink: ['/events/daily-events'] },
                    { label: 'Near Me', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'What Happpen Today', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/events/today/summary'] },
                    { label: 'Back to History', icon: 'pi pi-fw pi-box', routerLink: ['/events/history'] },
                ]
            },
            {
                label: 'Topics',
                items: [
                    { label: 'ALl Topic', icon: 'pi pi-fw pi-table', routerLink: ['/topics'], badge: 'NEW' },
                    { label: 'Topic Map', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'My Intereset', icon: 'pi pi-fw pi-globe', routerLink: ['/user-interests'], target: '_blank' },
                    { label: 'Add Intereset', icon: 'pi pi-fw pi-globe', routerLink: ['/user-interests/add'], target: '_blank' },
                ]
            },            {
                label: 'Management',
                items: [
                    { label: 'ALl Sources', icon: 'pi pi-fw pi-table', routerLink: ['/data-sources'], badge: 'NEW' },
                    { label: 'ALl Source Types', icon: 'pi pi-fw pi-table', routerLink: ['/data-source-types'], badge: 'NEW' },
                    { label: 'Scraping Domains', icon: 'pi pi-fw pi-eye', routerLink: ['/scraping-domains'], badge: 'NEW' },
                    { label: 'Platfroms', icon: 'pi pi-fw pi-globe', routerLink: ['/platforms'], badge: 'NEW' },
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
                label: 'Settings',
                items: [
                    { label: 'Pipeline Config', icon: 'pi pi-fw pi-prime', routerLink: ['/management/settings/pipeline'] },
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
                label: 'Scrapers',
                items: [
                    {
                        label: 'All Scrapers', icon: 'pi pi-fw pi-question', routerLink: ['/management/scrapers']
                    },
                    {
                        label: 'Scraping Tasks', icon: 'pi pi-fw pi-search', routerLink: ['/management/scraping-tasks']
                    },
                ]
            }
        ];
    }
}
