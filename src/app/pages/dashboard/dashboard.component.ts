import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  standalone:false
})
export class DashboardComponent  implements OnInit{

  tieredItems: MenuItem[] = [];

  sasStats = [
    {
      title: 'Active Events',
      value: 128,
      icon: 'pi-exclamation-triangle',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      subtitle: '15 new',
      subtitleColor: 'text-green-500',
      footer: 'since last update',
      footerColor: 'text-500'
    },
    {
      title: 'Monitored Regions',
      value: 34,
      icon: 'pi-globe',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      subtitle: '3 regions added',
      subtitleColor: 'text-green-500',
      footer: 'this week',
      footerColor: 'text-500'
    },
    {
      title: 'User Alerts Sent',
      value: 5420,
      icon: 'pi-bell',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      subtitle: '120 new alerts',
      subtitleColor: 'text-green-500',
      footer: 'last 24 hours',
      footerColor: 'text-500'
    }
  ];
      ngOnInit() {
        this.tieredItems = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            { separator: true },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-sign-out'
            }
        ];
      }
}
