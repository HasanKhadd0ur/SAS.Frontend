import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { UserInterestsComponent } from './components/user-interest/user-interest.component';
import { UserInterestFormComponent } from './components/user-interest-form/user-interest-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InterestsRoutingModule } from './interests-routing.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    UserInterestsComponent,
    UserInterestFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InterestsRoutingModule,
    CardModule,
    ToastModule,
    ButtonModule,
    InputTextModule
  ]
})
export class InterestsModule { }
