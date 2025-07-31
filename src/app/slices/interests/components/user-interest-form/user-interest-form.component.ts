import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { UserInterestService } from '../../service/user-interest.service';
import { MessageService } from 'primeng/api';

// Fix Leaflet's default icon paths (otherwise markers won't show properly)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-user-interest-form',
  templateUrl: './user-interest-form.component.html',
  styleUrls: ['./user-interest-form.component.css'],
  standalone: false,
  providers: [MessageService]
})
export class UserInterestFormComponent implements OnInit {
  form: FormGroup;
  map!: L.Map;
  marker!: L.Marker;
  circle!: L.Circle;
  existingInterests: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userInterestService: UserInterestService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      interestName: ['', Validators.required],
      latitude: [33.5138, Validators.required],
      longitude: [36.2765, Validators.required],
      radiusInKm: [5, [Validators.required, Validators.min(1)]],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadExistingInterests();
  }

  loadExistingInterests(): void {
    this.userInterestService.getAll().subscribe({
      next: (data) => {
        this.existingInterests = data;
        setTimeout(() => this.initMap(), 0);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load interests' });
      }
    });
  }

  initMap(): void {
    const initialLatLng = L.latLng(this.form.value.latitude, this.form.value.longitude);
    this.map = L.map('map').setView(initialLatLng, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(initialLatLng, { draggable: true }).addTo(this.map);

    this.circle = L.circle(initialLatLng, {
      radius: this.form.value.radiusInKm * 1000,
      color: 'blue',
      fillColor: '#3f51b5',
      fillOpacity: 0.3
    }).addTo(this.map);

    // Fetch city and country for initial position (Arabic names)
    this.fetchCityCountry(initialLatLng.lat, initialLatLng.lng);

    // Update form and circle position when marker is dragged
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.form.patchValue({ latitude: pos.lat, longitude: pos.lng });
      this.circle.setLatLng(pos);

      this.fetchCityCountry(pos.lat, pos.lng);
    });

    // Draw existing interests on the map
    for (const interest of this.existingInterests) {
      const latlng = L.latLng(interest.location.latitude, interest.location.longitude);
      L.circle(latlng, {
        radius: interest.radiusInKm * 1000,
        color: 'green',
        fillColor: '#4caf50',
        fillOpacity: 0.2
      }).addTo(this.map).bindPopup(`<b>${interest.interestName}</b><br>${interest.radiusInKm} km`);
    }
  }

  fetchCityCountry(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=ar`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const address = data.address || {};
        const city = address.city || address.town || address.village || '';
        const country = address.country || '';

        this.form.patchValue({ city, country });
      })
      .catch(() => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Failed to fetch city/country info' });
      });
  }

  onRadiusChange(): void {
    const radius = this.form.value.radiusInKm;
    this.circle.setRadius(radius * 1000);
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      const payload = {
        interestName: formValue.interestName,
        radiusInKm: formValue.radiusInKm,
        location: {
          latitude: formValue.latitude,
          longitude: formValue.longitude,
          city: formValue.city,
          country: formValue.country
        }
      };

      this.userInterestService.create(payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User interest created' });
          this.loadExistingInterests();
          this.form.reset({ latitude: 33.5138, longitude: 36.2765, radiusInKm: 5, city: '', country: '' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create interest' });
        }
      });
    }
  }
}
