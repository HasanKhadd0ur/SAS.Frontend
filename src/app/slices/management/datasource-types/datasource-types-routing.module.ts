import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceTypesComponent } from './componenet/datasource-types/datasource-types.component';
import { DatasourceTypeCreateComponent } from './componenet/datasource-type-create/datasource-type-create.component';


const routes: Routes = [
  { path: '', component: DataSourceTypesComponent },
  { path: 'create', component: DatasourceTypeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasourceTypesRoutingModule { }
