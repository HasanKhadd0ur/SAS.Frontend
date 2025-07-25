import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-topic-events',
  templateUrl: './topic-events.component.html',
  standalone: false,
  styleUrls: ['./topic-events.component.css']
})
export class TopicEventsComponent implements OnInit {
  events: Event[] = [];
  pagedEvents: Event[] = [];
  batchSize = 5;
  currentIndex = 0;
  loading = true;
  error = '';
  topic: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.topic = params['name'] || '';
    if (!this.topic) {
      this.error = 'Topic not specified.';
      this.loading = false;
      return;
    }

    this.eventService.getEventsByTopic(this.topic).subscribe({
      next: events => {
        this.events = events || [];
        this.loadMore();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = `Failed to load events for topic: ${this.topic}`;
        this.loading = false;
      }
    });
  });
}

  loadMore(): void {
    const next = this.events.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedEvents.push(...next);
    this.currentIndex += this.batchSize;
  }

  onViewEvent(event: Event): void {
    // Optional: Open a modal or navigate
  }

  getStatusClass(status: string | undefined): string {
    switch ((status || '').toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'reported':
        return 'status-reported';
      case 'under review':
      default:
        return 'status-review';
    }
  }
}
