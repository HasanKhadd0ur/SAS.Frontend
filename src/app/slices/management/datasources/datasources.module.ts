import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasourcesRoutingModule } from './datasources-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { DataSourcesComponent } from './components/data-sources/data-sources.component';
import { CardModule } from 'primeng/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    DataSourceComponent,
    DataSourcesComponent
  ],
  imports: [
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
  ],
  providers: [ConfirmationService, MessageService],
})
export class DatasourcesModule { }
