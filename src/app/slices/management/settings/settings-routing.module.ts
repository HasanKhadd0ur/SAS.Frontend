import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipelineConfigsEditComponent } from './components/pipeline-configs-edit/pipeline-configs-edit.component';
import { PipelineConfigsListComponent } from './components/pipeline-configs-list/pipeline-configs-list.component';
import { PipelineConfigsCreateComponent } from './components/pipeline-configs-create/pipeline-configs-create.component';

const routes: Routes = [
  {
    path: 'pipeline',
    component: PipelineConfigsListComponent
  },
  {
    path: 'pipeline/edit/:id',
    component: PipelineConfigsEditComponent
  },
  {
    path: 'pipeline/create',
    component: PipelineConfigsCreateComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
