import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-dailly-events',
  templateUrl: './dailly-events.component.html',
  styleUrls: ['./dailly-events.component.css'],
  standalone: false
})
export class DailyEventsComponent implements OnInit {
  events: Event[] = [];
  pagedEvents: Event[] = [];
  batchSize = 5;
  currentIndex = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.eventService.getDailyEvent().subscribe({
      next: events => {
        this.events = events;
        this.loadMore(); // Initial load
      },
      error: err => console.error(err)
    });
  }

  loadMore(): void {
    const next = this.events.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedEvents.push(...next);
    this.currentIndex += this.batchSize;
  }

  onViewEvent(event: Event) {
    // alert(`Viewing event: ${event.eventInfo.title}`);
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
