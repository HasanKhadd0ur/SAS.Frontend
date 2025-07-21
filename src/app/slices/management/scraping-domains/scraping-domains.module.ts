import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapingDomainsRoutingModule } from './scraping-domains-routing.module';
import { ScrapingDomainDetailsComponent } from './components/scraping-domain-details/scraping-domain-details.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ScrapingDomainListComponent } from './components/scraping-domain-list/scraping-domain-list.component';
import { ScrapingDomainCreateComponent } from './components/scraping-domain-create/scraping-domain-create.component';
import { ScrapingDomainUpdateComponent } from './components/scraping-domain-update/scraping-domain-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DatasourcesRoutingModule } from '../datasources/datasources-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    ScrapingDomainListComponent,
    ScrapingDomainDetailsComponent,
    ScrapingDomainCreateComponent,
    ScrapingDomainUpdateComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrapingDomainsRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DatasourcesRoutingModule,
    ToastModule,    
    CardModule,	
    ConfirmDialogModule,  
    InfiniteScrollModule,
    InputTextarea,
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ScrapingDomainsRoutingModule
  ],
  
    providers: [ConfirmationService, MessageService],
})
export class ScrapingDomainsModule { }
