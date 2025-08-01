import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-messages',
  templateUrl: './event-messages.component.html',
  standalone:false,
  styleUrls: ['./event-messages.component.css'],
})
export class EventMessagesComponent {
  @Input() eventId!: string;

  eventMessages: any[] = [];
  loading = false;
  @Input()show;

  constructor(
    private eventService: EventService,
    private messageService: MessageService
  ) {}

  toggle(): void {
    this.show = !this.show;

    if (this.show && this.eventMessages.length === 0) {
      this.loadMessages();
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
