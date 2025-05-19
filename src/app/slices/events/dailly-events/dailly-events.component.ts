import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-daily-events',
  templateUrl: './dailly-events.component.html',
  standalone:false,
  styleUrls: ['./dailly-events.component.css']
})
export class DailyEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    this.eventService.getEventsUpdatedAfter(twoDaysAgo).subscribe({
      next: (events: Event[]) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Failed to load daily events', err);
      }
    });
  }

  onViewEvent(event: Event) {
    alert(`Viewing event: ${event.eventInfo.title}`);
  }
}
