import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserInterest } from '../../models/user-interest.model';
import { UserInterestService } from '../../services/user-interest.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-user-interest',
  templateUrl: './user-interest.component.html',
  styleUrls: ['./user-interest.component.css'],
  standalone: false
})
export class UserInterestsComponent implements OnInit, AfterViewInit {
  interests: UserInterest[] = [];
  selectedInterest: UserInterest | null = null;

  // Modal controls
  showDeleteModal = false;
  interestToDelete: UserInterest | null = null;

  private map!: L.Map;
  private markers: L.FeatureGroup = L.featureGroup();

  constructor(private service: UserInterestService) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private loadInterests(): void {
    this.service.getAll().subscribe(res => {
      this.interests = res;
      this.addInterestsToMap();
    });
  }

  private initMap(): void {
    this.map = L.map('interestMap', {
      center: [20, 0],
      zoom: 2,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        })
      ]
    });
    this.markers.addTo(this.map);
  }

  private addInterestsToMap(): void {
    if (!this.map) return;

    this.markers.clearLayers();

    this.interests.forEach(interest => {
      const lat = interest.location.latitude;
      const lng = interest.location.longitude;
      const radiusMeters = interest.radiusInKm * 1000;

      const m = L.marker([lat, lng], {
        icon: L.icon({
          iconRetinaUrl: 'assets/leaflet/marker-icon.png',
          iconUrl: 'assets/leaflet/marker-icon.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          iconAnchor: [12, 41]
        })
      });

      m.bindPopup(`
        <b>${interest.interestName}</b><br>
        Radius: ${interest.radiusInKm} km<br>
        Location: (${lat.toFixed(4)}, ${lng.toFixed(4)})
      `);

      const c = L.circle([lat, lng], {
        radius: radiusMeters,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.2
      });

      this.markers.addLayer(m);
      this.markers.addLayer(c);
    });

    const groupBounds = this.markers.getBounds();
    if (groupBounds.isValid()) {
      this.map.fitBounds(groupBounds.pad(0.3));
    }
  }

  showOnMap(interest: UserInterest): void {
    this.selectedInterest = interest;

    if (!this.map) return;

    const lat = interest.location.latitude;
    const lng = interest.location.longitude;
    const radiusMeters = interest.radiusInKm * 1000;

    this.map.setView([lat, lng], 12);

    this.markers.clearLayers();

    const m = L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconAnchor: [12, 41]
      })
    }).addTo(this.map);

    m.bindPopup(`
      <b>${interest.interestName}</b><br>
      Radius: ${interest.radiusInKm} km<br>
      Location: (${lat.toFixed(4)}, ${lng.toFixed(4)})
    `).openPopup();

    const c = L.circle([lat, lng], {
      radius: radiusMeters,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2
    }).addTo(this.map);
  }

  // Open the modal dialog and pass the interest to delete
  confirmDelete(interest: UserInterest): void {
    this.interestToDelete = interest;
    this.showDeleteModal = true;
  }

  // Cancel delete
  cancelDelete(): void {
    this.interestToDelete = null;
    this.showDeleteModal = false;
  }

  // Perform actual delete
  deleteInterest(): void {
    if (!this.interestToDelete) return;

    this.service.delete(this.interestToDelete.id).subscribe({
      next: () => {
        this.interests = this.interests.filter(i => i.id !== this.interestToDelete!.id);
        this.addInterestsToMap();
        this.cancelDelete();
      },
      error: () => {
        // Optional: handle error better in UI
        alert('Failed to delete interest.');
      }
    });
  }
}
