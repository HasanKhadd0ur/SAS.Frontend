import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DividerModule } from 'primeng/divider';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

// import { provideAnimationsAsync } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

import { StyleClassModule } from 'primeng/styleclass';
import Aura from '@primeng/themes/aura';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { RippleModule } from "primeng/ripple";
import { MapModule } from './slices/map/map.module';
import { LocationInferenceModule } from './slices/location-inference/location-inference.module';
import { DetectionModule } from './slices/detection/detection.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PolicyViewComponent } from './slices/detection/compoenents/policy-view/policy-view.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotfoundComponent,
    DashboardComponent,
    PolicyViewComponent,
    AboutComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    DetectionModule,
    DividerModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    InputSwitchModule,
    MapModule,
    HttpClientModule,
     ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    StyleClassModule,
    LocationInferenceModule 
],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    },    // provideAnimationsAsync(),
    providePrimeNG({
      
    theme: {
      
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'primeng,theme'
        }
      }
    }
    }),
    ConfirmationService,

    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }