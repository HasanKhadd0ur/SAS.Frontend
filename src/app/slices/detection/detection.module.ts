import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetectionRoutingModule } from './detection-routing.module';
import { SettingComponent } from './compoenents/setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DetectionRoutingModule,
    HttpClientModule
  ]
})
export class DetectionModule { }
