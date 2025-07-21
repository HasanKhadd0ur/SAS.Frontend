import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrapingTasksService } from '../../services/scraping-tasks.service';
import { ScrapingTask } from '../../models/scraping-task.model';

@Component({
  selector: 'app-scraping-task-details',
  standalone:false,
  templateUrl: './scraping-task-details.component.html',
  styleUrls: ['./scraping-task-details.component.css']
})
export class ScrapingTaskDetailsComponent implements OnInit {
  task: ScrapingTask | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private scrapingTasksService: ScrapingTasksService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.scrapingTasksService.getTaskById(id).subscribe({
        next: (task) => {
          this.task = task;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load task.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid task ID.';
      this.loading = false;
    }
  }
}
