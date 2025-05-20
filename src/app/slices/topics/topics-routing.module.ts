import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTopicsComponent } from './component/all-topics/all-topics.component';

const routes: Routes = [
  
  { path: '', component: AllTopicsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
