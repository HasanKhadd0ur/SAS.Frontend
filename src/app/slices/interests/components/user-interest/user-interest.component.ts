import { Component, OnInit } from '@angular/core';
import { UserInterest } from '../../models/user-interest.model';
import { UserInterestService } from '../../service/user-interest.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-user-interest',
  templateUrl: './user-interest.component.html',
  standalone:false,
  styleUrls: ['./user-interest.component.css'],
})
export class UserInterestsComponent implements OnInit {
  interests: UserInterest[] = [];
  showMapView = false; // toggle between list and map view

  // Modal controls
  showDeleteModal = false;
  interestToDelete: UserInterest | null = null;

  private map!: L.Map;
  private markers: L.FeatureGroup = L.featureGroup();
  private mapInitialized = false;

  constructor(private service: UserInterestService) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  toggleView(): void {
    this.showMapView = !this.showMapView;

    if (this.showMapView && !this.mapInitialized) {
      // Delay map init to ensure container exists
      setTimeout(() => this.initMap(), 0);
    }
  }

  private loadInterests(): void {
    this.service.getMyInterests().subscribe((res) => {
      this.interests = res;
      if (this.mapInitialized) {
        this.addInterestsToMap();
      }
    });
  }

  private initMap(): void {
    const mapContainer = document.getElementById('interestMap');
    if (!mapContainer) {
      console.warn('Map container not found.');
      return;
    }

    this.map = L.map('interestMap', {
      center: [20, 0],
      zoom: 2,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }),
      ],
    });

    this.markers.addTo(this.map);
    this.mapInitialized = true;

    this.addInterestsToMap();
  }

  private addInterestsToMap(): void {
    if (!this.mapInitialized) return;

    this.markers.clearLayers();

    this.interests.forEach((interest) => {
      const lat = interest.location.latitude;
      const lng = interest.location.longitude;
      const radiusMeters = interest.radiusInKm * 1000;

      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconRetinaUrl: 'assets/leaflet/marker-icon.png',
          iconUrl: 'assets/leaflet/marker-icon.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          iconAnchor: [12, 41],
        }),
      });

      marker.bindPopup(`
        <b>${interest.interestName}</b><br>
        Radius: ${interest.radiusInKm} km<br>
        Location: (${lat.toFixed(4)}, ${lng.toFixed(4)})
      `);

      const circle = L.circle([lat, lng], {
        radius: radiusMeters,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.2,
      });

      this.markers.addLayer(marker);
      this.markers.addLayer(circle);
    });

    const bounds = this.markers.getBounds();
    if (bounds.isValid()) {
      this.map.fitBounds(bounds.pad(0.3));
    }
  }

  showOnMap(interest: UserInterest): void {
    this.showMapView = true;

    if (!this.mapInitialized) {
      setTimeout(() => {
        this.initMap();
        this.zoomToInterest(interest);
      }, 0);
    } else {
      this.zoomToInterest(interest);
    }
  }

  private zoomToInterest(interest: UserInterest): void {
    if (!this.mapInitialized) return;

    const lat = interest.location.latitude;
    const lng = interest.location.longitude;
    const radiusMeters = interest.radiusInKm * 1000;

    this.map.setView([lat, lng], 12);
    this.markers.clearLayers();

    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup(`
      <b>${interest.interestName}</b><br>
      Radius: ${interest.radiusInKm} km<br>
      Location: (${lat.toFixed(4)}, ${lng.toFixed(4)})
    `).openPopup();

    const circle = L.circle([lat, lng], {
      radius: radiusMeters,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
    }).addTo(this.map);
  }

  // Delete modal controls
  confirmDelete(interest: UserInterest): void {
    this.interestToDelete = interest;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.interestToDelete = null;
    this.showDeleteModal = false;
  }

  deleteInterest(): void {
    if (!this.interestToDelete) return;

    this.service.delete(this.interestToDelete.id).subscribe({
      next: () => {
        this.interests = this.interests.filter(
          (i) => i.id !== this.interestToDelete!.id
        );
        if (this.mapInitialized) this.addInterestsToMap();
        this.cancelDelete();
      },
      error: () => {
        alert('Failed to delete interest.');
      },
    });
  }
}
