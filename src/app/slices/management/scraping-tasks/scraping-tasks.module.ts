import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapingTasksRoutingModule } from './scraping-tasks-routing.module';
import { ScrapingTasksListComponent } from './components/scraping-tasks-list/scraping-tasks-list.component';


@NgModule({
  declarations: [
    ScrapingTasksListComponent
  ],
  imports: [
    CommonModule,
    ScrapingTasksRoutingModule
  ]
})
export class ScrapingTasksModule { }
