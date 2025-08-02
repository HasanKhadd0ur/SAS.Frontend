import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-messages',
  templateUrl: './event-messages.component.html',
  standalone: false,
  styleUrls: ['./event-messages.component.css'],
})
export class EventMessagesComponent implements OnChanges {
  @Input() eventId!: string;
  @Input() show = false;

  eventMessages: any[] = [];
  loading = false;

  constructor(
    private eventService: EventService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      if (this.show && this.eventMessages.length === 0) {
        this.loadMessages();
      }
      if (!this.show) {
        this.eventMessages = [];
      }
    }
  }

  loadMessages(): void {
    if (!this.eventId) return;

    this.loading = true;
    this.eventService.getMessagesByEvent(this.eventId).subscribe({
      next: (messages) => {
        this.eventMessages = messages;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load event messages.',
        });
        this.loading = false;
      },
    });
  }
}
