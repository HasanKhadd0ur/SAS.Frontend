import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../../events/models/event.model';
import { Topic } from '../../events/models/topic.model';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from '../../topics/services/topic.service';

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

  editingTopic = false;

  topicForm: FormGroup;

  filteredTopics: Topic[] = [];

  // Named entities
  showNamedEntities = false;
  namedEntities: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private topicService :TopicService,
    private fb: FormBuilder,
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
   loadEventMessages() {
    if (!this.event) return;

    this.loadingMessages = true;
    this.showMessages = false;

    this.eventService.getMessagesByEvent(this.event.id).subscribe({
      next: (messages) => {
        this.eventMessages = messages;
        this.showMessages = true;
        this.loadingMessages = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load event messages.',
          life: 3000,
        });
        this.loadingMessages = false;
      }
    });
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

  if (this.showMessages && this.eventMessages.length === 0) {
    this.loadEventMessages();
  }
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
    if (this.showNamedEntities && this.event) {
      this.eventService.getEventNamedEntities(this.event.id).subscribe({
        next: (entities) => {
          this.namedEntities = entities;
        },
        error: () => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Failed to load named entities.',
            life: 3000,
          });
        },
      });
    }
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

}
