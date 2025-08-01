import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/event.service';
import { NamedEntity } from '../../models/event.model';

@Component({
  selector: 'app-event-named-entities',
  templateUrl: './event-named-entities.component.html',
  standalone:false,
  styleUrls: ['./event-named-entities.component.css']
})
export class EventNamedEntitiesComponent implements OnInit {
  @Input() eventId!: string;

  namedEntities: NamedEntity[] = [];
  loading = false;
  @Input()show;

  constructor(
    private eventService: EventService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  toggle(): void {
    this.show = !this.show;
    if (this.show && this.namedEntities.length === 0) {
      this.loadNamedEntities();
    }
  }

  loadNamedEntities(): void {
    if (!this.eventId) return;

    this.loading = true;
    this.eventService.getEventNamedEntities(this.eventId).subscribe({
      next: (entities) => {
        this.namedEntities = entities;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load named entities.'
        });
        this.loading = false;
      }
    });
  }
}
