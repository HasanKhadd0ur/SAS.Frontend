import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../../events/models/event.model';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  standalone:false
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(event => this.event = event);
    }
  }
  goToUpdateLocation(): void {
  if (!this.event?.id) return;
  this.router.navigate(['/events', this.event.id, 'location']);
}
}
