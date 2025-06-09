import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourcesComponent } from './components/data-sources/data-sources.component';
import { DataSourceComponent } from './components/data-source/data-source.component';

const routes: Routes = [
  { path: '', component: DataSourcesComponent }, // List all
  { path: 'add', component: DataSourceComponent }, // Create new
  { path: 'edit/:id', component: DataSourceComponent }, // Edit existing
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasourcesRoutingModule { }
