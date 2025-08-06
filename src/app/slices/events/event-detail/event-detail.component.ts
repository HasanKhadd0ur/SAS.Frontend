import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event, Review } from '../../events/models/event.model';
import { Topic } from '../../events/models/topic.model';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from '../../topics/services/topic.service';
import { Overlay, OverlayRef } from 'ngx-toastr';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  standalone:false,
  styleUrls: ['./event-detail.component.css'],
  providers: [MessageService],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  isMonitor = false;
  eventMessages: any[] = [];
  loadingMessages = false;
  showMessages = false;
  showDeleteConfirm = false;
  @ViewChild('reviewFormPopup') reviewFormPopup!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;

  showReviewForm = false;

  editingTopic = false;

  topicForm: FormGroup;

  filteredTopics: Topic[] = [];
  showReviews = false;
  loadingReviews = false;
  reviews: Review[] = []
  // Named entities
  showNamedEntities = false;
  namedEntities: any[] = [];
 
  reviewForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private topicService :TopicService,
    private fb: FormBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    this.topicForm = this.fb.group({
      topicName: ['', Validators.required],
      selectedTopicId: [null, Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(event => {
        this.event = event;
      });
    }

    this.isMonitor = this.userService.getRoles().includes(UserService.ROLE_MONITOR);
  }
  
  openReviewForm() {
    this.showReviewForm = true;
    // If using Angular CDK Overlay, you can create and attach overlay here (optional)
  }

  closeReviewForm() {
    this.showReviewForm = false;
    this.reviewForm.reset();
    // Detach overlay if using Angular CDK Overlay
  }

  onTopicNameInput(value: string) {
    if (!value || value.trim() === '') {
      this.filteredTopics = [];
      this.topicForm.patchValue({ selectedTopicId: null });
      return;
    }

    this.topicService.getTopics().subscribe(topics => {
      this.filteredTopics = topics.filter(t =>
        t.name.toLowerCase().includes(value.toLowerCase())
      );
      this.topicForm.patchValue({ selectedTopicId: null });
    });
  }

  selectTopic(topic: Topic) {
    this.topicForm.patchValue({
      topicName: topic.name,
      selectedTopicId: topic.id,
    });
    this.filteredTopics = [];
  }
  toggleMessages(): void {
  this.showMessages = !this.showMessages;

}


  startEditTopic() {
    this.editingTopic = true;
    this.topicForm.reset();

    if (this.event?.topic) {
      this.topicForm.patchValue({
        topicName: this.event.topic.name,
        selectedTopicId: this.event.topic.id,
      });
    }
  }

  cancelEditTopic() {
    this.editingTopic = false;
    this.topicForm.reset();
  }

  submitTopicChange() {
    if (!this.event || this.topicForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please select a valid topic from the list.',
        life: 3000,
      });
      return;
    }

    const selectedTopicId = this.topicForm.value.selectedTopicId;

    this.eventService.changeEventTopic(this.event.id, selectedTopicId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event topic updated successfully.',
          life: 3000,
        });
        if (this.event) {
          this.event.topic = {
            id: selectedTopicId,
            name: this.topicForm.value.topicName,
          };
        }
        this.editingTopic = false;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update event topic.',
          life: 3000,
        });
        console.error('Failed to update event topic:', err);
      },
    });
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

  markAsReviewed(): void {
    if (!this.event?.id) return;

    this.eventService.markEventAsReviewed(this.event.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event marked as completed.',
          life: 3000,
        });
        if (this.event) this.event.isReviewed = true;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark event as completed.',
          life: 3000,
        });
        console.error('Failed to mark event as completed:', err);
      },
    });
  }

  toggleNamedEntities() {
    this.showNamedEntities = !this.showNamedEntities;
  }

  goToEventsByNamedEntity(entityName: string) {
    this.router.navigate(['/events', 'named-entity', entityName]);
  }

deleteEvent() {
  if (!this.event?.id) return;

  this.eventService.deleteEvent(this.event.id).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'The event has been deleted.',
        life: 3000,
      });
      this.router.navigate(['/events']);
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete the event.',
        life: 3000,
      });
      console.error('Delete failed:', err);
    },
  });

  this.showDeleteConfirm = false; // hide popup
}
confirmDelete() {
  this.showDeleteConfirm = true;
}

 loadReviews() {
    if (!this.event) return;

    this.loadingReviews = true;
    this.eventService.getReviewsByEvent(this.event.id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.showReviews = true;
        this.loadingReviews = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load event reviews.',
          life: 3000,
        });
        this.loadingReviews = false;
      },
    });
  }
  onReviewSubmitted() {
    this.loadReviews(); // Or any action to refresh reviews after submit
  }
  toggleReviews() {
    this.showReviews = !this.showReviews;

    if (this.showReviews && this.reviews.length === 0) {
      this.loadReviews();
    }
  }

  // Update submitReview to reload reviews after adding
  submitReview() {
    if (!this.event || this.reviewForm.invalid) return;

    const reviewData = {
      eventId: this.event.id,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment
    };

    this.eventService.addReview(reviewData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Review Submitted',
          detail: 'Your review has been added.',
          life: 3000,
        });
        this.showReviewForm = false;
        this.reviewForm.reset();
        this.loadReviews(); // refresh reviews
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to submit review.',
          life: 3000,
        });
        console.error('Submit review failed:', err);
      }
    });
  }
}
