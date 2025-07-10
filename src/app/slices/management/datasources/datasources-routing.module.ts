import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourcesComponent } from './components/data-sources/data-sources.component';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { AddDataSourceComponent } from './components/add-data-source/add-data-source.component';
import { DataSourceDetailsComponent } from './components/data-source-details/data-source-details.component';
import { EditDataSourceComponent } from './components/edit-data-source/edit-data-source.component';

const routes: Routes = [
  { path: '', component: DataSourcesComponent }, // List all
  { path: 'add', component: AddDataSourceComponent }, // Create new
  { path: 'edit/:id', component: EditDataSourceComponent }, // Edit existing
  { path: ':id', component: DataSourceDetailsComponent  }, // Edit existing
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasourcesRoutingModule { }
