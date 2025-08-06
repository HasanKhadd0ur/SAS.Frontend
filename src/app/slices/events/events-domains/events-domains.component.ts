import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PlatformsService } from '../../management/platforms/services/platforms.service';
import { ScrapingDomain } from '../../management/scraping-domains/models/scraping-domains.model';
import { ScrapingDomainsService } from '../../management/scraping-domains/services/scraping-domains.service';
import { Platform } from '../../management/platforms/models/platforms.model';

@Component({
  selector: 'app-events-domains',
  standalone: false,
  templateUrl: './events-domains.component.html',
  styleUrl: './events-domains.component.css'
})
export class EventsDomainsComponent  implements OnInit {

  scrapingDomains: ScrapingDomain[] = [];
  pagedScrapingDomains: ScrapingDomain[] = [];
  platforms: Platform[] = [];
  batchSize = 6;
  currentIndex = 0;

  constructor(
    private scrapingDomainService: ScrapingDomainsService, 
    private messageService: MessageService,
    private platformsService: PlatformsService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.platformsService.getAll().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
        this.loadDomains();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load platforms' });
      }
    });
  }

  loadDomains() {
    this.scrapingDomainService.getAll().subscribe({
      next: (domains) => {
        this.scrapingDomains = domains;
        this.resetPaged();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load Scraping Domains' });
      }
    });
  }

  resetPaged() {
    this.pagedScrapingDomains = [];
    this.currentIndex = 0;
    this.loadMore();
  }

  loadMore(): void {
    const next = this.scrapingDomains.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedScrapingDomains.push(...next);
    this.currentIndex += this.batchSize;
  }

  getPlatformName(id: string): string {
    return this.platforms.find(p => p.id === id)?.name || 'Unknown';
  }

  onView(domain: ScrapingDomain): void {
    this.router.navigate(['/events/by-domain', domain.id]);
  }

}
