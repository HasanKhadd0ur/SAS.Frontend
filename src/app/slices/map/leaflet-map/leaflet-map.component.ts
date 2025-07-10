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

  private addMarkers(events: Event[]): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    const groupedEvents = new Map<string, Event[]>();

    events.forEach((event) => {
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

    groupedEvents.forEach((eventsAtLocation, key) => {
      const [lat, lng] = key.split(',').map(Number);
      const maxEventsToShow = 3;
      const eventsToShow = eventsAtLocation.slice(0, maxEventsToShow);

      let popupContent = eventsToShow
        .map((e) => `<div><b>${e.eventInfo.title}</b></div>`)
        .join('<hr style="margin:4px 0">');

      if (eventsAtLocation.length > maxEventsToShow) {
        const moreCount = eventsAtLocation.length - maxEventsToShow;
        popupContent += `<hr style="margin:4px 0"><div>... and ${moreCount} more</div>`;
      }

      const iconUrl = eventsAtLocation[0]?.topic?.iconUrl;

      const icon = iconUrl
        ? L.icon({
            iconUrl: iconUrl,
            iconSize: [30, 35],
            iconAnchor: [15, 35],
            popupAnchor: [0, -30],
            shadowUrl: 'assets/leaflet/marker-shadow.png',
            shadowSize: [40, 40],
          })
        : new L.Icon.Default();

      const marker = L.marker([lat, lng], { icon }).bindPopup(popupContent);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  private centerMap(): void {
    if (this.markers.length > 0) {
      const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
      this.map.fitBounds(bounds);
    }
  }
}
