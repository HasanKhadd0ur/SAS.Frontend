import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/slices/events/services/event.service';
import { Event } from 'src/app/slices/events/models/event.model';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];
  recentEvents: Event[] = [];

  stats = {
    total: 0,
    reviewed: 0,
    unreviewed: 0,
    sentiments: {
      Positive: 0,
      Neutral: 0,
      Negative: 0
    }
  };

  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadDailyEvents();
  }

  loadDailyEvents(): void {
    this.eventService.getDailyEvent().subscribe({
      next: (data) => {
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 488);

        // Filter events updated within last 488 hours
        const filteredEvents = data.filter(e => new Date(e.lastUpdatedAt) >= cutoffDate);

        this.events = filteredEvents;

        // Keep only last 4 events sorted by lastUpdatedAt desc
        this.recentEvents = [...filteredEvents]
          .sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime())
          .slice(0, 4);

        this.computeStats(filteredEvents);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading daily events:', err);
        this.loading = false;
      }
    });
  }

  computeStats(events: Event[]) {
    this.stats.total = events.length;
    this.stats.reviewed = events.filter(e => e.isReviewed).length;
    this.stats.unreviewed = this.stats.total - this.stats.reviewed;

    this.stats.sentiments = {
      Positive: events.filter(e => e.eventInfo?.sentimentLabel === 'Positive').length,
      Neutral: events.filter(e => e.eventInfo?.sentimentLabel === 'Neutral').length,
      Negative: events.filter(e => e.eventInfo?.sentimentLabel === 'Negative').length
    };
  }
}
