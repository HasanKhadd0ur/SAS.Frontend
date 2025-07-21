import { Component, OnInit } from '@angular/core';
import { ScrapingTasksService } from '../../services/scraping-tasks.service';
import { ScrapingTask } from '../../models/scraping-task.model';

@Component({
  selector: 'app-scraping-tasks-list',
  templateUrl: './scraping-tasks-list.component.html',
  standalone:false,
  styleUrls: ['./scraping-tasks-list.component.css']
})
export class ScrapingTasksListComponent implements OnInit {
  tasks: ScrapingTask[] = [];
  loading = true;
  loadingMore = false;

  pageNumber = 1;
  pageSize = 10;
  hasMore = true;

  constructor(private taskService: ScrapingTasksService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks(this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
        this.hasMore = data.length === this.pageSize;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    if (this.loadingMore || !this.hasMore) return;

    this.loadingMore = true;
    this.pageNumber++;

    this.taskService.getAllTasks(this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.tasks = [...this.tasks, ...data];
        this.loadingMore = false;
        this.hasMore = data.length === this.pageSize;
      },
      error: (err) => {
        console.error('Error loading more tasks:', err);
        this.loadingMore = false;
      }
    });
  }
}