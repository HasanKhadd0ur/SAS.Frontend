import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { EventService } from '../services/event.service';

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-update-event-location',
  templateUrl: './update-event-location.component.html',
  standalone: false,
  styleUrls: ['./update-event-location.component.css'],
  providers: [MessageService]
})
export class UpdateEventLocationComponent implements OnInit {
  eventId!: string;
  form: FormGroup;
  map!: L.Map;
  marker!: L.Marker;
  circle!: L.Circle;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private eventService: EventService,
    private router : Router
  ) {
    this.form = this.fb.group({
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      city: [''],
      country: ['']
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    if (!this.eventId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Event ID is missing in route.' });
      return;
    }

    this.eventService.getEventById(this.eventId).subscribe({
      next: event => {
        if (event?.location) {
          this.form.patchValue({
            latitude: event.location.latitude,
            longitude: event.location.longitude,
            city: event.location.city || '',
            country: event.location.country || ''
          });
        } else {
          this.form.patchValue({ latitude: 33.5138, longitude: 36.2765 });
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Event has no location. Using default coordinates.' });
        }

        setTimeout(() => this.initMap(), 0);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load event data.' });
        this.form.patchValue({ latitude: 33.5138, longitude: 36.2765 });
        setTimeout(() => this.initMap(), 0);
      }
    });
  }

  initMap(): void {
    const initial = L.latLng(this.form.value.latitude, this.form.value.longitude);

    this.map = L.map('map').setView(initial, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(initial, { draggable: true }).addTo(this.map);

    this.circle = L.circle(initial, {
      radius: 500,
      color: 'blue',
      fillOpacity: 0.3
    }).addTo(this.map);

    this.fetchReverseGeocode(initial.lat, initial.lng);

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.form.patchValue({ latitude: pos.lat, longitude: pos.lng });
      this.circle.setLatLng(pos);
      this.fetchReverseGeocode(pos.lat, pos.lng);
    });
  }

  fetchReverseGeocode(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    this.http.get<any>(url).subscribe({
      next: data => {
        const address = data.address || {};
        this.form.patchValue({
          city: address.city || address.town || address.village || '',
          country: address.country || ''
        });
      },
      error: () => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Could not determine city/country from coordinates.' });
      }
    });
  }

  submit(): void {
    if (this.form.valid && this.eventId) {
      const payload = {
        eventId: this.eventId,
        location: {
          latitude: this.form.value.latitude,
          longitude: this.form.value.longitude,
          city: this.form.value.city,
          country: this.form.value.country
        }
      };

      this.eventService.updateLocation(this.eventId, payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location updated successfully.' });
           this.router.navigate(['/events/view', this.eventId]);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update location.' });
        }
      });
    }
  }
}
