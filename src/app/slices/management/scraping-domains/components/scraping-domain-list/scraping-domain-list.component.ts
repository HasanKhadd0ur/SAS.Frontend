import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrapingDomain } from '../../models/scraping-domains.model';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';
import { Platform } from '../../../platforms/models/platforms.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlatformsService } from '../../../platforms/services/platforms.service';

@Component({
  selector: 'app-scraping-domain-list',
  templateUrl: './scraping-domain-list.component.html',
  standalone:false,
  styleUrls: ['./scraping-domain-list.component.css'],  // <-- fix here
})
export class ScrapingDomainListComponent implements OnInit {

  scrapingDomains: ScrapingDomain[] = [];
  pagedScrapingDomains: ScrapingDomain[] = [];
  platforms: Platform[] = [];
  batchSize = 6;
  currentIndex = 0;

  constructor(
    private scrapingDomainService: ScrapingDomainsService,   // <-- fix here (use scrapingDomainService)
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

  onEdit(domain: ScrapingDomain): void {
    this.router.navigate(['/scraping-domains/edit', domain.id]);
  }

  onView(domain: ScrapingDomain): void {
    this.router.navigate(['/scraping-domains', domain.id]);
  }

  confirmDelete(domain: ScrapingDomain): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete '${domain.name}'?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.scrapingDomainService.delete(domain.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Scraping domain deleted successfully.' });
            // Refresh list after deletion
            this.loadDomains();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
          }
        });
      }
    });
  }
}
