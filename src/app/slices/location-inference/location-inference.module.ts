import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationInferenceRoutingModule } from './location-inference-routing.module';
import { LocationConfigComponent } from './components/location-config/location-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    LocationConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationInferenceRoutingModule,
    ReactiveFormsModule,
    
  ],
  
})
export class LocationInferenceModule { }
