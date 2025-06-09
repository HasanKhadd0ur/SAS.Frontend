import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
        path: '',
        component: LandingComponent
      },
      
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      
      { path: 'home', component: DashboardComponent },
      { path: 'map', loadChildren: () => import('./slices/map/map.module').then(m => m.MapModule) },
      { path: 'events', loadChildren: () => import('./slices/events/events.module').then(m => m.EventsModule) },
      { path: 'topics', loadChildren: () => import('./slices/topics/topics.module').then(m => m.TopicsModule) },
      { path: 'data-sources', loadChildren: () => import('./slices/management/datasources/datasources.module').then(m => m.DatasourcesModule) },
      { path: 'scraping-domains', loadChildren: () => import('./slices/management/scraping-domains/scraping-domains.module').then(m => m.ScrapingDomainsModule) },
      { path: 'platforms', loadChildren: () => import('./slices/management/platforms/platforms.module').then(m => m.PlatformsModule) },
           
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  
  { path: '**', redirectTo: '/home' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
