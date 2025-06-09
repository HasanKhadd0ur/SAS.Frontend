import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary.component.html',
  styleUrls: ['./today-summary.component.css'],
  standalone:false
})
export class TodaySummaryComponent implements OnInit {
  summaryMarkdown: string = '';
  loading = false;
  error: string | null = null;

  constructor(private eventsService : EventService) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.loading = true;
    this.error = null;

      this.eventsService.getTodaySummary().subscribe({
        next: (data) => {
          this.summaryMarkdown = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load summary.';
          this.loading = false;
          console.log(err)
        }
      });
  }
}
