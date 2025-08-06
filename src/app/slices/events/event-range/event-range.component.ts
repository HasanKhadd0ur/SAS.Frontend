import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-range',
  standalone: false,
  templateUrl: './event-range.component.html',
  styleUrls: ['./event-range.component.css'],
})
export class EventRangeComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  events: Event[] = [];
  showMapView = false;
  isLoading = false; // 🔄 New loading flag

  private map: L.Map | null = null;
  private markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  loadEvents(): void {
    if (!this.startDate || !this.endDate) return;

    this.isLoading = true;

    const from = new Date(this.startDate);
    const to = new Date(this.endDate);
    to.setHours(23, 59, 59, 999); // include full day

    this.eventService.getEventsCreatedBetween(from, to).subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;

        if (this.showMapView) {
          setTimeout(() => {
            this.initMapIfNeeded();
            this.plotEventsOnMap(events);
          }, 100);
        }
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.isLoading = false;
      }
    });
  }

  onToggleView(): void {
    if (this.showMapView && this.events.length > 0) {
      setTimeout(() => {
        this.initMapIfNeeded();
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
      if (ev.location?.latitude && ev.location?.longitude) {
        const marker = L.marker([ev.location.latitude, ev.location.longitude])
          .bindPopup(`<strong>${ev.eventInfo.title}</strong><br>${ev.eventInfo.summary || ''}`);
        marker.addTo(this.markersLayer);
      }
    }

    if (events.length && events[0].location) {
      this.map.setView([events[0].location.latitude, events[0].location.longitude], 7);
    }
  }
}
