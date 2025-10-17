import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Event } from '../../events/models/event.model';
import { EventService } from '../../events/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-bydomain',
  standalone: false,
  templateUrl: './map-bydomain.component.html',
  styleUrl: './map-bydomain.component.css'
})
export class MapBydomainComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  domainId!: string;
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  showAll: boolean = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.domainId = params.get('id') || '';
      if (this.map && this.domainId) {
        this.loadEventsByDomain(this.domainId);
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
    if (this.domainId) {
      this.loadEventsByDomain(this.domainId);
    }
  }

  private initMap(): void {
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });

    this.map = L.map('event-domain-map', {
      layers: [osm],
      fullscreenControl: true,
      fullscreenControlOptions: { position: 'topright' },
    }).setView([33.5138, 36.2765], 5);

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/icons8-protest.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }

  private loadEventsByDomain(domainId: string): void {
    this.eventService.getEventsByDomain(domainId).subscribe({
      next: (events: Event[]) => {
        this.allEvents = events;
        this.filteredEvents = this.filterLastTenDays(events);
        this.addMarkers(this.filteredEvents);
        this.centerMap();
      },
      error: (err) => {
        console.error('Failed to load events:', err);
      },
    });
  }

  private filterLastTenDays(events: Event[]): Event[] {
    const now = new Date();
    let ct =0
    const tenDaysAgo = new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000);
    return events.filter(e => {
      ct +=1;
 return ct <=20;
    });
  }

  showMoreEvents() {
    this.filteredEvents = this.allEvents;
    this.clearMarkers();
    this.addMarkers(this.filteredEvents);
    this.centerMap();
    this.showAll = true;
  }

  private clearMarkers(): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
  }

  private groupEventsByLocation(events: Event[]): { [key: string]: Event[] } {
    const grouped: { [key: string]: Event[] } = {};
    events.forEach((event) => {
      const lat = event.location?.latitude;
      const lng = event.location?.longitude;
      if (lat != null && lng != null) {
        const key = `${lat},${lng}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(event);
      }
    });
    return grouped;
  }

  private buildPopupContent(events: Event[]): string {
    const maxEventsToShow = 3;
    const eventsToShow = events.slice(0, maxEventsToShow);

    let popupContent = eventsToShow
      .map((e) => `<div><b>${e.eventInfo.title}</b></div>`)
      .join('<hr style="margin:4px 0">');

    if (events.length > maxEventsToShow) {
      popupContent += `<hr style="margin:4px 0"><div>... and ${events.length - maxEventsToShow} more</div>`;
    }

    return popupContent;
  }

  private addMarkers(events: Event[]): void {
    if (!this.map) return;

    this.clearMarkers();
    const grouped = this.groupEventsByLocation(events);

    for (const key in grouped) {
      const eventsAtLocation = grouped[key];
      const { latitude, longitude } = eventsAtLocation[0].location;
      const popupContent = this.buildPopupContent(eventsAtLocation);
      const topicIconUrl = eventsAtLocation[0]?.topic?.iconUrl;

      let icon: L.Icon<L.IconOptions>;
      if (topicIconUrl && topicIconUrl.trim() !== '') {
        icon = new L.Icon({
          iconUrl: topicIconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          shadowSize: [41, 41],
          shadowAnchor: [12, 41],
        });
      } else {
        icon = new L.Icon({
          iconUrl: 'assets/leaflet/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          shadowSize: [41, 41],
        });
      }

      const marker = L.marker([latitude, longitude], { icon }).bindPopup(popupContent);
      marker.addTo(this.map);
      this.markers.push(marker);
    }
  }

  private centerMap(): void {
    if (this.markers.length > 0) {
      const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
      this.map.fitBounds(bounds);
    }
  }
}