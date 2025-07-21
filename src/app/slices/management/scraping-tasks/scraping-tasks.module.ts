import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapingTasksRoutingModule } from './scraping-tasks-routing.module';
import { ScrapingTasksListComponent } from './components/scraping-tasks-list/scraping-tasks-list.component';
import { CardModule } from 'primeng/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrapingTaskDetailsComponent } from './components/scraping-task-details/scraping-task-details.component';


@NgModule({
  declarations: [
    ScrapingTasksListComponent,
    ScrapingTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CardModule,
    ScrapingTasksRoutingModule
  ]
})
export class ScrapingTasksModule { }
