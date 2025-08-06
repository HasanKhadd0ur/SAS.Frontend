import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-minimap';
import 'leaflet-measure';
import { Event } from '../../events/models/event.model';
import { EventService } from '../../events/services/event.service';

declare module 'leaflet' {
  interface MapOptions {
    fullscreenControl?: boolean;
    fullscreenControlOptions?: {
      position?: L.ControlPosition;
      title?: string;
      titleCancel?: string;
      forceSeparateButton?: boolean;
    };
  }

  namespace Control {
    class MiniMap extends L.Control {
      constructor(layer: L.TileLayer, options?: any);
    }
  }
}

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
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });

    const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap contributors',
    });

    const cartoDark = L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
      { attribution: '© CartoDB' }
    );

    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: '© Esri' }
    );

    this.map = L.map('map', {
      fullscreenControl: true,
      fullscreenControlOptions: { position: 'topright' },
      layers: [osm],
    }).setView([33.5138, 36.2765], 5);

    // Set default icon (fallback)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/icons8-protest.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    const baseMaps = {
      OpenStreetMap: osm,
      Topographic: topo,
      'Carto Dark': cartoDark,
      Satellite: satellite,
    };
    L.control.layers(baseMaps, {}, { position: 'topright' }).addTo(this.map);

    const miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const miniMap = new (L.Control as any).MiniMap(miniMapLayer, {
      toggleDisplay: true,
      minimized: false,
      position: 'bottomright',
    }).addTo(this.map);

    const measureControl = new (L.Control as any).Measure({
      position: 'topleft',
      primaryLengthUnit: 'meters',
      primaryAreaUnit: 'sqmeters',
      activeColor: '#db4a29',
      completedColor: '#9b2d14',
    });
    measureControl.addTo(this.map);
  }

  private loadTodayEvents(): void {
    const now = new Date();
    const todayMidnight = new Date();
    todayMidnight.setHours(now.getHours() - 24);

    this.eventService.getEventsUpdatedAfter(todayMidnight).subscribe({
      next: (events: Event[]) => {
        this.addMarkers(events);
        this.centerMap();
      },
      error: (err) => {
        console.error('Failed to load events:', err);
      },
    });
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
  debugger
  if (!this.map) return;

  this.clearMarkers();
  const grouped = this.groupEventsByLocation(events);

  for (const key in grouped) {
    const eventsAtLocation = grouped[key];
    const { latitude, longitude } = eventsAtLocation[0].location;

    const popupContent = this.buildPopupContent(eventsAtLocation);
    const topicIconUrl = eventsAtLocation[0]?.topic?.iconUrl;

    let icon: L.Icon<L.IconOptions>;

    // Check if iconUrl exists and is not an empty string (trimmed)
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
      // Use default icon if no valid topic icon url
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
