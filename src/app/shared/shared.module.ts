import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppMenuitemComponent } from './layout/menu-item/app.menuitem.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AppFooterComponent } from './layout/footer/app.footer.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppMenuComponent } from './layout/menu/app.menu.component';
import { AppSidebarComponent } from './layout/sidebar/app.sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigModule } from './layout/config/config.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { NotificationsComponent } from './coponents/notifications/notifications.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
      AppMenuitemComponent,
      AppTopBarComponent,
      AppFooterComponent,
      AppMenuComponent,
      AppSidebarComponent,
      AppLayoutComponent,
      NotificationsComponent,
  ],
  imports: [

    CommonModule,
    NgOptimizedImage,
    RouterModule,
    TooltipModule,
    AppConfigModule,
    ToastModule,
    BrowserModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    RadioButtonModule,
    InputSwitchModule,
    BrowserAnimationsModule,
  ],
  exports: [
      AppMenuitemComponent,
      AppTopBarComponent,
      AppFooterComponent,
      AppMenuComponent,
      AppSidebarComponent,
      AppLayoutComponent,
  
  ],
  providers:[MessageService]
})
export class SharedModule { }
