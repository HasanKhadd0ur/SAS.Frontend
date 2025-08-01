import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-review-form',
  templateUrl: './event-review-form.component.html',
  standalone:false,
  styleUrls: ['./event-review-form.component.css'],
})
export class EventReviewFormComponent {
  @Input() eventId!: string;
  @Input() show = false;

  @Output() close = new EventEmitter<void>();
  @Output() reviewSubmitted = new EventEmitter<void>();

  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private messageService: MessageService
  ) {
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  submitReview() {
    if (!this.eventId || this.reviewForm.invalid) return;

    const reviewData = {
      eventId: this.eventId,
      comment: this.reviewForm.value.comment,
    };

    this.eventService.addReview(reviewData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Review Submitted',
          detail: 'Your review has been added.',
          life: 3000,
        });
        this.reviewForm.reset();
        this.reviewSubmitted.emit();
        this.close.emit();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to submit review.',
          life: 3000,
        });
        console.error('Submit review failed:', err);
      },
    });
  }

  cancel() {
    this.reviewForm.reset();
    this.close.emit();
  }
}
