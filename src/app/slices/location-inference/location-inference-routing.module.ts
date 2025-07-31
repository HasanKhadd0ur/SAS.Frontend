import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationConfigComponent } from './components/location-config/location-config.component';

const routes: Routes = [
  {
    path:'config',
    component:LocationConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationInferenceRoutingModule { }
