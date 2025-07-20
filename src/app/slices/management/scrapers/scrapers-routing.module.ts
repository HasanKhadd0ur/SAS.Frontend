import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapersListComponent } from './components/scrapers-list/scrapers-list.component';

const routes: Routes = [
      { path: '', component: ScrapersListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapersRoutingModule { }
