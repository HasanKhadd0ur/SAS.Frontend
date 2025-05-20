  import { Component, OnInit, AfterViewInit } from '@angular/core';
  import * as L from 'leaflet';
  import { Event } from '../../events/models/event.model';
  import { EventService } from '../../events/services/event.service';

  @Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-map.component.html',
    styleUrls: ['./leaflet-map.component.css'],
    standalone: false,
  })
  export class LeafletMapComponent implements OnInit, AfterViewInit {
    private map!: L.Map;
    private markers: L.Marker[] = [];

    constructor(private eventService: EventService) {}

    ngOnInit() {}

    ngAfterViewInit() {
      this.initMap();
      this.loadTodayEvents();
    }

    private initMap(): void {
      const baseMapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      this.map = L.map('map').setView([33.5138, 36.2765], 5); // Initial view (e.g., Damascus)

      // Fix for default icon paths (marker icon and shadow)
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png'
      });

      L.tileLayer(baseMapURL, {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    }

    private loadTodayEvents(): void {
      
      const now = new Date();

      const todayMidnight = new Date();

      
      todayMidnight.setDate(now.getDate() - 2); // set to start of today

      this.eventService.getEventsUpdatedAfter(todayMidnight).subscribe({
        next: (events: Event[]) => {
          console.log (events)
          this.addMarkers(events);
          this.centerMap();
        },
        error: (err) => {
          console.error('Failed to load events:', err);
        },
      });
    }
private addMarkers(events: Event[]): void {
  // Clear previous markers from map
  this.markers.forEach(marker => this.map.removeLayer(marker));
  this.markers = [];

  // Group events by coordinate string "lat,lng"
  const groupedEvents = new Map<string, Event[]>();

  events.forEach(event => {
    const lat = event.location?.latitude;
    const lng = event.location?.longitude;
    if (lat != null && lng != null) {
      const key = `${lat},${lng}`;
      if (!groupedEvents.has(key)) {
        groupedEvents.set(key, []);
      }
      groupedEvents.get(key)!.push(event);
    }
  });

  // Create one marker per unique location with a popup listing up to 5 events there
  groupedEvents.forEach((eventsAtLocation, key) => {
    const [lat, lng] = key.split(',').map(Number);

    // Show only first 5 events in popup
    const maxEventsToShow = 3;
    const eventsToShow = eventsAtLocation.slice(0, maxEventsToShow);

    // Create HTML content for popup: list event titles and statuses
    let popupContent = eventsToShow.map(e => {
      const status = e.status ?? 'Under Review';
      return `<div><b>${e.eventInfo.title}</b><br>Status: ${status}</div>`;
    }).join('<hr style="margin:4px 0">');

    // If there are more than 5 events, show "... and X more"
    if (eventsAtLocation.length > maxEventsToShow) {
      const moreCount = eventsAtLocation.length - maxEventsToShow;
      popupContent += `<hr style="margin:4px 0"><div>... and ${moreCount} more</div>`;
    }

    const marker = L.marker([lat, lng]).bindPopup(popupContent);
    marker.addTo(this.map);
    this.markers.push(marker);
  });
}

    // private addMarkers(events: Event[]): void {
    //   this.markers = events
    //     .filter(e => e.location?.latitude && e.location?.longitude)
    //     .map(event => {
    //       const marker = L.marker([event.location.latitude, event.location.longitude])
    //         .bindPopup(`<b>${event.eventInfo.title}</b><br>Status: ${event.status??="Under Review"}`);
    //       marker.addTo(this.map);
    //       return marker;
    //     });
    // }

    private centerMap(): void {
      if (this.markers.length > 0) {
        // const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
        // this.map.fitBounds(bounds);
      }
    }
  }
