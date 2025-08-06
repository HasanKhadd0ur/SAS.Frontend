import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { ScrapingDomainsService } from '../../management/scraping-domains/services/scraping-domains.service';
import { ScrapingDomain } from '../../management/scraping-domains/models/scraping-domains.model';

@Component({
  selector: 'app-events-by-domain',
  templateUrl: './events-by-domain.component.html',
  styleUrls: ['./events-by-domain.component.css'],
  standalone: false
})
export class EventsByDomainComponent implements OnInit {
  domainId!: string;
  domainName: string = '';
  events: Event[] = [];
  pagedEvents: Event[] = [];
  batchSize = 5;
  currentIndex = 0;
  loading = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private scrapingDomainService: ScrapingDomainsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.domainId = params.get('id') || '';
      if (this.domainId) {
        this.loadDomainName(this.domainId);
        this.loadEventsByDomain(this.domainId);
      }
    });
  }

  loadDomainName(domainId: string) {
    this.scrapingDomainService.getById(domainId).subscribe({
      next: (domain: ScrapingDomain) => {
        this.domainName = domain.name;
      },
      error: err => {
        console.error('Failed to load domain info', err);
        this.domainName = '';
      }
    });
  }

  loadEventsByDomain(domainId: string) {
    this.loading = true;
    this.errorMsg = '';
    this.eventService.getEventsByDomain(domainId).subscribe({
      next: events => {
        this.events = events;
        this.pagedEvents = [];
        this.currentIndex = 0;
        this.loadMore();
        this.loading = false;
      },
      error: err => {
        this.errorMsg = 'Failed to load events.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadMore(): void {
    const nextBatch = this.events.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedEvents.push(...nextBatch);
    this.currentIndex += this.batchSize;
  }

  onViewEvent(event: Event) {
    this.router.navigate(['/events/view', event.id]);
  }

  getStatusClass(status: string | undefined): string {
    switch ((status || '').toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'reported':
        return 'status-reported';
      case 'under review':
      default:
        return 'status-review';
    }
  }
}
