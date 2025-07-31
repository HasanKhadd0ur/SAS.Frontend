import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../../events/models/event.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  standalone: false
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  isMonitor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(event => this.event = event);
    }

    this.isMonitor = this.userService.getRoles().includes(UserService.ROLE_MONITOR);
    console.log(this.userService.getRoles());
    
  }

  goToUpdateLocation(): void {
    if (!this.event?.id) return;
    this.router.navigate(['/events', this.event.id, 'location']);
  }

  goToUpdateInfo(): void {
    if (this.event?.id) {
      this.router.navigate([`/events/${this.event.id}/update-info`]);
    }
  }

  markAsCompleted(): void {
    if (!this.event?.id) return;

    this.eventService.markEventAsReviewed(this.event.id).subscribe({
      next: () => {
        alert('Event marked as completed.');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Failed to mark event as completed:', err);
      }
    });
  }
}
