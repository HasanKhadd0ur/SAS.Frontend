import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInterestFormComponent } from './components/user-interest-form/user-interest-form.component';
import { UserInterestsComponent } from './components/user-interest/user-interest.component';

const routes: Routes = [
  { path: '', component: UserInterestsComponent },
  { path: 'add', component: UserInterestFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestsRoutingModule { }
