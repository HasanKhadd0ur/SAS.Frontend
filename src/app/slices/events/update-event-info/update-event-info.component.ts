import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-update-event-info',
  standalone:false,
  templateUrl: './update-event-info.component.html',
  styleUrls: ['./update-event-info.component.css'],
  providers: [MessageService]
})
export class UpdateEventInfoComponent implements OnInit {
  eventId!: string;
  form: FormGroup;

  // Keep original sentiment values
  sentimentScore: number = 0;
  sentimentLabel: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private eventService: EventService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      summary: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    if (!this.eventId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Event ID missing in route.' });
      return;
    }

    this.eventService.getEventById(this.eventId).subscribe({
      next: event => {
        if (event?.eventInfo) {
          this.form.patchValue({
            title: event.eventInfo.title,
            summary: event.eventInfo.summary
          });

          this.sentimentScore = event.eventInfo.sentimentScore;
          this.sentimentLabel = event.eventInfo.sentimentLabel;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No event info found. Please fill the form.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load event data.' });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields correctly.' });
      return;
    }

    const eventInfoPayload = {
      title: this.form.value.title,
      summary: this.form.value.summary,
      sentimentScore: this.sentimentScore,
      sentimentLabel: this.sentimentLabel
    };

    this.eventService.updateEventInfo(this.eventId, eventInfoPayload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event info updated successfully.' });
        this.router.navigate(['/events/view', this.eventId]);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update event info.' });
      }
    });
  }
}
