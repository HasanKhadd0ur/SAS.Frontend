import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/event.service';
import { NamedEntity } from '../../models/event.model';

@Component({
  selector: 'app-event-named-entities',
  templateUrl: './event-named-entities.component.html',
  standalone: false,
  styleUrls: ['./event-named-entities.component.css']
})
export class EventNamedEntitiesComponent implements OnInit, OnChanges {
  @Input() eventId!: string;
  @Input() show = false;

  namedEntities: NamedEntity[] = [];
  loading = false;

  constructor(
    private eventService: EventService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      if (this.show && this.namedEntities.length === 0) {
        this.loadNamedEntities();
      }
      if (!this.show) {
        this.namedEntities = [];
      }
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
