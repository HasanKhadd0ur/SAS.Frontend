import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasourceTypesRoutingModule } from './datasource-types-routing.module';
import { DataSourceTypesComponent } from './componenet/datasource-types/datasource-types.component';
import { DatasourceTypeCreateComponent } from './componenet/datasource-type-create/datasource-type-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    DataSourceTypesComponent,
    DatasourceTypeCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DatasourceTypesRoutingModule,
    DialogModule
  ],
   providers: [
    MessageService
  ]
})
export class DatasourceTypesModule { }
