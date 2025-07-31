import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-named-entity-events',
  templateUrl: './named-entity-events.component.html',
  standalone: false,
  styleUrls: ['./named-entity-events.component.css']
})
export class NamedEntityEventsComponent implements OnInit {
  namedEntityId!: string;

  pagedEvents: Event[] = [];
  page = 1;
  pageSize = 10;
  loading = false;
  hasMore = true;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read namedEntityId from query parameters
    this.route.params.subscribe(params => {
      this.namedEntityId = params['id'];
      this.resetAndLoadEvents();
    });
  }

  resetAndLoadEvents(): void {
    this.pagedEvents = [];
    this.page = 1;
    this.hasMore = true;
    this.loadEvents();
  }

  loadEvents(): void {
    if (this.loading || !this.hasMore || !this.namedEntityId) return;
    this.loading = true;

    this.eventService.getEventsByNamedEntityId(this.namedEntityId, this.page, this.pageSize)
      .subscribe(result => {
        if (result) {
          this.pagedEvents.push(...result);
          this.hasMore = result.length === this.pageSize;
          this.page++;
        } else {
          this.hasMore = false;
        }
        this.loading = false;
      });
  }

  loadMore(): void {
    this.loadEvents();
  }

  onViewEvent(event: Event): void {
    console.log('Viewing event:', event.id);
  }

  getStatusClass(status: string): string {
    return status?.toLowerCase() || '';
  }
}
