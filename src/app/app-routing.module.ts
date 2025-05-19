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
