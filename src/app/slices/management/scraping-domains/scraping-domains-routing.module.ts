import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapingDomainDetailsComponent } from './components/scraping-domain-details/scraping-domain-details.component';
import { ScrapingDomainListComponent } from './components/scraping-domain-list/scraping-domain-list.component';
import { ScrapingDomainCreateComponent } from './components/scraping-domain-create/scraping-domain-create.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapingDomainListComponent,
  },{
    path: 'add',
    component: ScrapingDomainCreateComponent
  },
  {
    path: ':id',
    component: ScrapingDomainDetailsComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapingDomainsRoutingModule { }
