import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapingTasksListComponent } from './components/scraping-tasks-list/scraping-tasks-list.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ScrapingTaskDetailsComponent } from './components/scraping-task-details/scraping-task-details.component';

const routes: Routes = [
  {
      path: '',
      component: ScrapingTasksListComponent,
  },
  {
    path:':id',
    component: ScrapingTaskDetailsComponent
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapingTasksRoutingModule { }
