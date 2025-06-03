import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DatasourcesRoutingModule } from '../datasources/datasources-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PlatformsComponent
  ],
  imports: [
    CommonModule,
      CommonModule,
      DatasourcesRoutingModule,
      ButtonModule,
      DialogModule,
      ToastModule,    
      TableModule,
      CardModule,	
      ConfirmDialogModule,
      
      InfiniteScrollModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
    
    PlatformsRoutingModule
  ],
  
    providers: [ConfirmationService, MessageService],
})
export class PlatformsModule { }
