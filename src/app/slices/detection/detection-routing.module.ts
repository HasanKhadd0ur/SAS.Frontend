import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './compoenents/setting/setting.component';
import { PolicyViewComponent } from './compoenents/policy-view/policy-view.component';
import { PolicyComponent } from './compoenents/policy/policy.component';

const routes: Routes = [
  {
    path:'settings',
    component:SettingComponent
  },
  {
    path:'policy',
    component:PolicyViewComponent
  },
  {
    path:'policy/edit/:name',
    component:PolicyComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetectionRoutingModule { }
