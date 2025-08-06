import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-events-by-area',
  standalone: false,
  templateUrl: './events-by-area.component.html',
  styleUrls: ['./events-by-area.component.css']
})
export class EventsByAreaComponent implements OnInit, AfterViewInit, OnDestroy {
  latitude: number | null = null;
  longitude: number | null = null;
  radius: number = 5; // km

  events: Event[] = [];
  showMapView = false;
  isLoading = false;

  private map: L.Map | null = null;
  private markersLayer: L.LayerGroup = L.layerGroup();
  private circle: L.Circle | null = null;
  private locationMarker: L.Marker | null = null;
  private radiusMarker: L.Marker | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('area-map').setView([33.5138, 36.2765], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);

    // Click on map sets location
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.setLocation(e.latlng.lat, e.latlng.lng);
    });
  }

  private setLocation(lat: number, lng: number): void {
    this.latitude = lat;
    this.longitude = lng;

    // Remove old markers and circle
    if (this.locationMarker) this.map!.removeLayer(this.locationMarker);
    if (this.circle) this.map!.removeLayer(this.circle);
    if (this.radiusMarker) this.map!.removeLayer(this.radiusMarker);

    // Add draggable location marker
    this.locationMarker = L.marker([lat, lng], { draggable: true }).addTo(this.map!);
    this.locationMarker.on('drag', () => {
      if (!this.locationMarker) return;
      const pos = this.locationMarker.getLatLng();
      this.latitude = pos.lat;
      this.longitude = pos.lng;

      // Update circle center and radius marker position on drag
      if (this.circle) this.circle.setLatLng(pos);
      if (this.radiusMarker) {
        const edge = this.computeEdgePoint(pos.lat, pos.lng, this.radius);
        this.radiusMarker.setLatLng(edge);
      }
    });

    this.locationMarker.on('dragend', () => {
      // Optionally reload events or do something on drag end
    });

    // Add circle around location
    this.circle = L.circle([lat, lng], {
      radius: this.radius * 1000,
      color: 'blue',
      fillColor: '#cce5ff',
      fillOpacity: 0.3,
      weight: 2
    }).addTo(this.map!);

    // Add draggable radius marker at circle edge
    const edgePoint = this.computeEdgePoint(lat, lng, this.radius);
    this.radiusMarker = L.marker(edgePoint, {
      draggable: true,
      // icon: L.divIcon({ className: 'radius-handle' }),
      icon: L.divIcon({ className: 'radius-handle' }),
      zIndexOffset: 1000 // make sure radius marker is on top
    }).addTo(this.map!);

    // Update radius as radius marker is dragged
    this.radiusMarker.on('drag', (event) => {
      console.log('Dragging radius marker',event)
      if (!this.locationMarker || !this.radiusMarker || !this.circle) return;

      const marker = event.target as L.Marker;
      const pos = marker.getLatLng();
      const center = this.locationMarker.getLatLng();

      // Calculate distance in km from center to dragged marker
      const distanceKm = this.map!.distance(center, pos) / 1000;

      // Update radius with minimum 1 km, rounded to 0.1 km
      this.radius = Math.max(1, Math.round(distanceKm * 10) / 10);

      // Update circle radius dynamically
      this.circle.setRadius(this.radius * 1000);
    });

    // Snap radius marker to circle edge on drag end
    this.radiusMarker.on('dragend', () => {
      
      if (!this.locationMarker || !this.radiusMarker) return;

      const center = this.locationMarker.getLatLng();
      const edge = this.computeEdgePoint(center.lat, center.lng, this.radius);
      this.radiusMarker.setLatLng(edge);
    });

    this.map!.setView([lat, lng], 10);
  }

  // Compute point east of center at distance radiusKm
  private computeEdgePoint(lat: number, lng: number, radiusKm: number): L.LatLngExpression {
    const earthRadiusKm = 6371;
    const deltaLng = (radiusKm / earthRadiusKm) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
    return [lat, lng + deltaLng];
  }

  loadEvents(): void {
    if (this.latitude == null || this.longitude == null || this.radius <= 0) {
      alert('Please select a location and a radius greater than zero.');
      return;
    }

    this.isLoading = true;
    this.eventService.getEventsByArea(this.latitude, this.longitude, this.radius).subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;

        if (this.showMapView) {
          setTimeout(() => this.plotEventsOnResultMap(events), 100);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load events by area:', err);
      }
    });
  }

  onToggleView(): void {
    if (this.showMapView && this.events.length > 0) {
      setTimeout(() => this.plotEventsOnResultMap(this.events), 100);
    }
  }

  private plotEventsOnResultMap(events: Event[]): void {
    let resultMap = this.map;

    if (!resultMap) {
      resultMap = L.map('result-map').setView([this.latitude!, this.longitude!], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(resultMap);
    }

    let eventMarkersLayer = (resultMap as any)._eventMarkersLayer;
    if (eventMarkersLayer) {
      eventMarkersLayer.clearLayers();
    } else {
      eventMarkersLayer = L.layerGroup().addTo(resultMap);
      (resultMap as any)._eventMarkersLayer = eventMarkersLayer;
    }

    for (const ev of events) {
      if (ev.location?.latitude && ev.location?.longitude) {
        const marker = L.marker([ev.location.latitude, ev.location.longitude])
          .bindPopup(`<strong>${ev.eventInfo.title}</strong><br>${ev.eventInfo.summary || ''}`);
        marker.addTo(eventMarkersLayer);
      }
    }

    if (events.length && events[0].location) {
      resultMap.setView([events[0].location.latitude, events[0].location.longitude], 8);
    }
  }
}
