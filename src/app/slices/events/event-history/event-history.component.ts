import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { TopicService } from '../../topics/services/topic.service';
import { Topic } from '../models/topic.model';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css'],
  standalone: false
})
export class EventHistoryComponent implements OnInit {
  selectedDate: Date | null = null;
  events: Event[] = [];
  pagedEvents: Event[] = [];
  batchSize = 6;
  currentIndex = 0;
  showMapView = false;

  topics: Topic[] = [];
  selectedTopicId: string = '';

  private map: L.Map | null = null;
  private markersLayer: L.LayerGroup = L.layerGroup();

  constructor(
    private eventService: EventService,
    private topicsService: TopicService
  ) {}

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.topicsService.getTopics().subscribe({
      next: (topics) => (this.topics = topics),
      error: (err) => console.error('Failed to load topics:', err),
    });
  }

  onToggleView(): void {
    if (this.showMapView) {
      setTimeout(() => {
        this.initMapIfNeeded();
        this.map?.invalidateSize();
        this.plotEventsOnMap(this.events);
      }, 100);
    }
  }

  initMapIfNeeded(): void {
    if (this.map || !document.getElementById('map')) return;

    this.map = L.map('map').setView([33.5138, 36.2765], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  plotEventsOnMap(events: Event[]): void {
    if (!this.map || !this.markersLayer) return;

    this.markersLayer.clearLayers();

    for (const ev of events) {
      if (ev.location && ev.location.latitude && ev.location.longitude) {
        const marker = L.marker([ev.location.latitude, ev.location.longitude])
          .bindPopup(`<strong>${ev.eventInfo.title}</strong><br>${ev.eventInfo.summary || ''}`);
        marker.addTo(this.markersLayer);
      }
    }

    if (events.length > 0 && events[0].location) {
      this.map.setView([events[0].location.latitude, events[0].location.longitude], 7);
    }
  }

  onLoadEvents(): void {
    if (!this.selectedDate) return;

    this.resetState();

    const from = new Date(this.selectedDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(this.selectedDate);
    to.setHours(23, 59, 59, 999);

    if (this.selectedTopicId) {
      this.eventService.getEventsByTopic(this.selectedTopicId).subscribe({
        next: (events) => {
          // Filter by date on client side, since API doesn't support date + topic filter
          this.events = events.filter(ev => {
            const created = new Date(ev.createdAt);
            return created >= from && created <= to;
          });
          this.loadMore();
          if (this.showMapView) {
            setTimeout(() => {
              this.initMapIfNeeded();
              this.map?.invalidateSize();
              this.plotEventsOnMap(this.events);
            }, 100);
          }
        },
        error: (err) => console.error('Failed to load events by topic:', err)
      });
    } else {
      this.eventService.getEventsCreatedBetween(from, to).subscribe({
        next: (events) => {
          this.events = events;
          this.loadMore();
          if (this.showMapView) {
            setTimeout(() => {
              this.initMapIfNeeded();
              this.map?.invalidateSize();
              this.plotEventsOnMap(events);
            }, 100);
          }
        },
        error: (err) => {
          console.error('Failed to load events:', err);
        }
      });
    }
  }

  onTopicChange(topicId: string) {
    this.selectedTopicId = topicId;
    if (this.selectedDate) {
      this.onLoadEvents();
    }
  }

  markReviewed(event: Event) {
    if (event.isReviewed) return;

    this.eventService.markEventAsReviewed(event.id).subscribe({
      next: () => {
        event.isReviewed = true;
      },
      error: (err) => {
        console.error('Failed to mark event as reviewed:', err);
      }
    });
  }

  resetState(): void {
    this.events = [];
    this.pagedEvents = [];
    this.currentIndex = 0;
    this.markersLayer?.clearLayers();
  }

  loadMore(): void {
    const next = this.events.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedEvents.push(...next);
    this.currentIndex += this.batchSize;
  }
}
