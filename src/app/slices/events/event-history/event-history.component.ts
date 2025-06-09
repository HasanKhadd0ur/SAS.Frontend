import { Component } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css'],
  standalone:false
})
export class EventHistoryComponent {
  selectedDate: Date | null = null;
  events: Event[] = [];
  pagedEvents: Event[] = [];
  batchSize = 6;
  currentIndex = 0;

  constructor(private eventService: EventService) {}

  onLoadEvents(): void {
    if (!this.selectedDate) return;

    this.resetState();

    const from = new Date(this.selectedDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(this.selectedDate);
    to.setHours(23, 59, 59, 999);

    this.eventService.getEventsCreatedBetween(from, to).subscribe({
      next: (events) => {
        this.events = events;
        this.loadMore();
      },
      error: (err) => {
        console.error('Failed to load events:', err);
      }
    });
  }

  resetState(): void {
    this.events = [];
    this.pagedEvents = [];
    this.currentIndex = 0;
  }

  loadMore(): void {
    const next = this.events.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedEvents.push(...next);
    this.currentIndex += this.batchSize;
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
