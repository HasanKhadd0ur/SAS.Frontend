import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrapingDomain } from '../../models/scraping-domains.model';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';
import { Platform } from '../../../platforms/models/platforms.model';
import { DataSourcesService } from '../../../datasources/servies/datasources.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlatformService } from '../../../platforms/services/platforms.service';

@Component({
  selector: 'app-scraping-domain-list',
  standalone: false,
  templateUrl: './scraping-domain-list.component.html',
  styleUrl: './scraping-domain-list.component.css'
})

export class ScrapingDomainListComponent implements OnInit {

  scrapingDomains: ScrapingDomain[] = [];
  pagedScrapingDomains: ScrapingDomain[] = [];
  platforms: Platform[] = [];
  batchSize = 6;
  currentIndex = 0;


  constructor(
    private dataSourcesService: DataSourcesService,
    private scrapingDomainService: ScrapingDomainsService,
    private messageService: MessageService,
    private platformsService: PlatformService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.platformsService.getAll().subscribe({
      next: (platforms) => {
        console.log(platforms);

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
        
        this.loadMore();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load Scraping Domains' });
      }
    });

  }

  getPlatformName(id: string): string {
    return this.platforms.find(p => p.id === id)?.name || 'Unknown';
  }

  loadMore(): void {
    const next = this.scrapingDomains.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedScrapingDomains.push(...next);
    this.currentIndex += this.batchSize;
  }

  onEdit(dataSource: ScrapingDomain): void {
    this.router.navigate(['/datasources/edit', dataSource.id]);
  }

  confirmDelete(dataSource: ScrapingDomain): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete '${dataSource.name}'?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataSourcesService.delete(dataSource.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Data source deleted' });
            this.reset();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
          }
        });
      }
    });
  }

  reset(): void {
    this.scrapingDomains = [];
    this.pagedScrapingDomains = [];
    this.currentIndex = 0;
    this.ngOnInit();
  }
}
