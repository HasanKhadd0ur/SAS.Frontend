import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { PipelineConfigsListComponent } from './components/pipeline-configs-list/pipeline-configs-list.component';
import { PipelineConfigsEditComponent } from './components/pipeline-configs-edit/pipeline-configs-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipelineConfigsCreateComponent } from './components/pipeline-configs-create/pipeline-configs-create.component';
import { BlockedTermsListComponent } from './components/blocked-terms-list/blocked-terms-list.component';


@NgModule({
  declarations: [
    PipelineConfigsListComponent,
    PipelineConfigsEditComponent,
    PipelineConfigsCreateComponent,
    BlockedTermsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
