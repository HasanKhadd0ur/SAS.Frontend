import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Review } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-reviews',
  standalone: false,
  templateUrl: './event-reviews.component.html',
  styleUrls: ['./event-reviews.component.css']
})
export class EventReviewsComponent implements OnInit, OnChanges {
  @Input() eventId!: string;
  @Input() show = false;

  loading = false;
  reviews: Review[] = [];

  constructor(
    private eventService: EventService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Optional: initial fetch
    if (this.show && this.reviews.length === 0) {
      this.loadReviews();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.show && this.reviews.length === 0) {
      this.loadReviews();
    }
  }

  loadReviews() {
    if (!this.eventId) return;
    this.loading = true;
    this.eventService.getReviewsByEvent(this.eventId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load reviews.',
        });
        this.loading = false;
      },
    });
  }
}
