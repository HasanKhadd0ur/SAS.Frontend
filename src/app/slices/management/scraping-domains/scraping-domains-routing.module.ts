import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapingDomainDetailsComponent } from './components/scraping-domain-details/scraping-domain-details.component';
import { ScrapingDomainListComponent } from './components/scraping-domain-list/scraping-domain-list.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapingDomainListComponent,
  },
  {
    path: ':id',
    component: ScrapingDomainDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapingDomainsRoutingModule { }
