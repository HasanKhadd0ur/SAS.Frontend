import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTopicsComponent } from './component/all-topics/all-topics.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicFormDialogComponent } from './component/topic-form-dialog/topic-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    AllTopicsComponent,
    TopicFormDialogComponent
  ],
  providers:[
    DialogService
  ],
  imports: [   
    CommonModule,
    TopicsRoutingModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TopicsModule { }
