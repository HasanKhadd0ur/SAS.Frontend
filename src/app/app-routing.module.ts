import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
        path: '',
        component: LandingComponent
  },
  {
        path: 'about',
        component: AboutComponent
  },
  {
        path: 'faq',
        component: FaqComponent
  },
  { path: 'auth',loadChildren: () => import('./slices/identity/identity.module').then(m => m.IdentityModule)
    
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
      { path: 'data-source-types', loadChildren: () => import('./slices/management/datasource-types/datasource-types.module').then(m => m.DatasourceTypesModule) },
      { path: 'user-interests', loadChildren: () => import('./slices/interests/interests.module').then(m => m.InterestsModule) },
      { path: 'management/settings', loadChildren: () => import('./slices/management/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'management/scrapers', loadChildren: () => import('./slices/management/scrapers/scrapers.module').then(m => m.ScrapersModule) },
      { path: 'management/scraping-tasks', loadChildren: () => import('./slices/management/scraping-tasks/scraping-tasks.module').then(m => m.ScrapingTasksModule) },
      { path: 'notifications', loadChildren: () => import('./slices/notifications/notifications.module').then(m => m.NotificationsModule) },
      { path: 'location', loadChildren: () => import('./slices/location-inference/location-inference-routing.module').then(m => m.LocationInferenceRoutingModule) },
      { path: 'detection', loadChildren: () => import('./slices/detection/detection-routing.module').then(m => m.DetectionRoutingModule) },
           
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
