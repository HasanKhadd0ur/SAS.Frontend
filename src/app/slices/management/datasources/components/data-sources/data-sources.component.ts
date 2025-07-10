import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

import { DataSource } from '../../models/datasource.model';
import { DataSourcesService } from '../../servies/datasources.service';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { Platform } from '../../../platforms/models/platforms.model';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.css'],
  standalone: false
})
export class DataSourcesComponent implements OnInit {
  dataSources: DataSource[] = [];
  pagedDataSources: DataSource[] = [];
  platforms: Platform[] = [];
  batchSize = 6;
  currentIndex = 0;

  constructor(
    private dataSourcesService: DataSourcesService,
    private platformService: PlatformsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDataAndPlatforms();
  }

  loadDataAndPlatforms(): void {
    forkJoin({
      dataSources: this.dataSourcesService.getAll(),
      platforms: this.platformService.getAll()
    }).subscribe({
      next: ({ dataSources, platforms }) => {
        this.platforms = platforms;

        this.dataSources = dataSources.map(ds => ({
          ...ds,
          lastTimeScraped: ds.lastTimeScraped ?? new Date(),
          platform: platforms.find(p => p.id === ds.platformId)
        }));

        this.pagedDataSources = [];
        this.currentIndex = 0;
        this.loadMore();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data sources or platforms' });
      }
    });
  }

  getPlatformName(id: string): string {
    return this.platforms.find(p => p.id === id)?.name || 'Unknown';
  }

  loadMore(): void {
    const next = this.dataSources.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedDataSources.push(...next);
    this.currentIndex += this.batchSize;
  }

  onEdit(dataSource: DataSource): void {
    this.router.navigate(['/datasources/edit', dataSource.id]);
  }

  confirmDelete(dataSource: DataSource): void {
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
    this.dataSources = [];
    this.pagedDataSources = [];
    this.currentIndex = 0;
    this.loadDataAndPlatforms();
  }
}
