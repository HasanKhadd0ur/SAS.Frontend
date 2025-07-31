import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../../events/models/event.model';
import { Topic } from '../../events/models/topic.model';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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

  // UI state to toggle topic edit form
  editingTopic = false;

  // Topic form and filtered list for autocomplete
  topicForm: FormGroup;
  filteredTopics$: Observable<Topic[]> = of([]);

  // New: Named Entities
  showNamedEntities = false;
  namedEntities: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private topicService: TopicService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.topicForm = this.fb.group({
      topicName: ['', Validators.required],
      selectedTopicId: [''],
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

    // Autocomplete/filter topics as user types
    this.filteredTopics$ = this.topicForm.get('topicName')!.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.searchTopics(value))
    );
  }

  searchTopics(term: string): Observable<Topic[]> {
    if (!term || term.trim() === '') {
      return of([]);
    }
    return this.topicService.getTopics();
  }

  startEditTopic() {
    this.editingTopic = true;
    this.topicForm.reset();

    if (this.event?.topic?.name) {
      this.topicForm.patchValue({ topicName: this.event.topic.name, selectedTopicId: this.event.topic.id });
    }
  }

  cancelEditTopic() {
    this.editingTopic = false;
    this.topicForm.reset();
  }

  onSelectTopic(topic: Topic) {
    this.topicForm.patchValue({
      topicName: topic.name,
      selectedTopicId: topic.id,
    });
  }

  submitTopicChange() {
    if (!this.event || this.topicForm.invalid) return;

    const selectedTopicId = this.topicForm.value.selectedTopicId;

    if (!selectedTopicId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please select a valid topic from the list.',
        life: 3000,
      });
      return;
    }

    this.eventService.changeEventTopic(this.event.id, selectedTopicId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event topic updated successfully.',
          life: 3000,
        });
        if (this.event) {
          this.event.topic = { id: selectedTopicId, name: this.topicForm.value.topicName };
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

  // New method to toggle and load named entities
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

  // Navigate to events by named entity
  goToEventsByNamedEntity(entityName: string) {
    // Assuming route is something like /events/named-entity/:entityName
    this.router.navigate(['/events', 'named-entity', entityName]);
  }
}
