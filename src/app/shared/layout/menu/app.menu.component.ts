import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from '../service/app.layout.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone:false

})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,private userService :UserService, private authService :AuthenticationService) {
    }

ngOnInit() {
  const isMonitor = this.userService.getRoles().includes(UserService.ROLE_MONITOR);

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
        { label: 'By Range', icon: 'pi pi-fw pi-calendar', routerLink: ['/events/by-range'] },
        { label: 'By Area', icon: 'pi pi-fw pi-map-marker', routerLink: ['/events/by-area'] },

     ]
    },
    {
      label: 'Topics',
      items: [
        { label: 'ALl Topic', icon: 'pi pi-fw pi-table', routerLink: ['/topics'], badge: 'NEW' },
        { label: 'Entities', icon: 'pi pi-fw pi-table', routerLink: ['/events/entities'], badge: 'NEW' },
      ]
    },
    {
      label: 'Interests',
      items: [
        { label: 'My Intereset', icon: 'pi pi-fw pi-globe', routerLink: ['/user-interests'], target: '_blank' },
        { label: 'Add Intereset', icon: 'pi pi-fw pi-globe', routerLink: ['/user-interests/add'], target: '_blank' },
      ]
    },
    {
      label: 'Notification',
      icon: 'pi pi-fw pi-briefcase',
      items: [
        {
          label: 'Notification',
          icon: 'pi pi-fw pi-globe',
          routerLink: ['/notifications']
        }
      ]
    },
    {
      label: 'Account',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => this.logout()
        }
      ]
    }
  ];

  // Conditionally add Management and Settings
  if (isMonitor) {
    this.model.splice(4, 0, {
      label: 'Management',
      items: [
        { label: 'ALl Sources', icon: 'pi pi-fw pi-table', routerLink: ['/data-sources'], badge: 'NEW' },
        { label: 'ALl Source Types', icon: 'pi pi-fw pi-table', routerLink: ['/data-source-types'], badge: 'NEW' },
        { label: 'Scraping Domains', icon: 'pi pi-fw pi-eye', routerLink: ['/scraping-domains'], badge: 'NEW' },
        { label: 'Add Domains', icon: 'pi pi-fw pi-eye', routerLink: ['/scraping-domains/add'], badge: 'NEW' },
        { label: 'Platfroms', icon: 'pi pi-fw pi-globe', routerLink: ['/platforms'], badge: 'NEW' },
      ]
    });

    this.model.splice(5, 0, {
      label: 'Settings',
      items: [
        { label: 'Pipeline Config', icon: 'pi pi-fw pi-prime', routerLink: ['/management/settings/pipeline'] },
        { label: 'Blocked Terms', icon: 'pi pi-fw pi-prime', routerLink: ['/management/settings/blocked-terms'] },
        { label: 'Location Infernce', icon: 'pi pi-fw pi-prime', routerLink: ['/location/config'] },
      ]
    });
    this.model.splice(5, 0, {
      
      label: 'Scrapers',
      items: [
        {
          label: 'All Scrapers', icon: 'pi pi-fw pi-question', routerLink: ['/management/scrapers']
        },
        {
          label: 'Scraping Tasks', icon: 'pi pi-fw pi-search', routerLink: ['/management/scraping-tasks']
        },      ]
    });
    
  }

}
    logout(): void {
        this.authService.logout();
    }
}
