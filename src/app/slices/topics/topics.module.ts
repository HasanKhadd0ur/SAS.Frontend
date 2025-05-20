import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTopicsComponent } from './component/all-topics/all-topics.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TopicsRoutingModule } from './topics-routing.module';



@NgModule({
  declarations: [
    AllTopicsComponent
  ],
  imports: [   
    CommonModule,
    TopicsRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class TopicsModule { }
