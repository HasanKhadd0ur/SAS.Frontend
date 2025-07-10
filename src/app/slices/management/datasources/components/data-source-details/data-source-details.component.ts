import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourcesService } from '../../servies/datasources.service';
import { ScrapingDomainsService } from '../../../scraping-domains/services/scraping-domains.service';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { DataSourceTypeService } from '../../../datasource-types/services/datasource-types.service';
import { DataSource } from '../../models/datasource.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-source-details',
  templateUrl: './data-source-details.component.html',
  standalone: false,
  styleUrls: ['./data-source-details.component.css'],
  providers: [MessageService]
})
export class DataSourceDetailsComponent implements OnInit {
  dataSource: DataSource | null = null;
  loading = true;

  domainName: string = '';
  platformName: string = '';
  typeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataSourcesService: DataSourcesService,
    private domainsService: ScrapingDomainsService,
    private platformsService: PlatformsService,
    private typesService: DataSourceTypeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDataSource(id);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid data source ID' });
      this.router.navigate(['/datasources']);
    }
  }

  fetchDataSource(id: string): void {
    this.loading = true;

    this.dataSourcesService.getById(id).subscribe({
      next: (res) => {
        this.dataSource = res;
        this.loadExtras(res);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data source' });
        this.router.navigate(['/datasources']);
      }
    });
  }

  loadExtras(ds: DataSource): void {
    this.domainsService.getById(ds.domainId).subscribe(domain => this.domainName = domain.name);
    this.platformsService.getById(ds.platformId).subscribe(platform => this.platformName = platform.name);
    if (ds.dataSourceType) {
      this.typeName = ds.dataSourceType.name;
    } else {
      this.typesService.getAll().subscribe(types => {
        const type = types.find(t => t.id === ds.dataSourceType?.id);
        this.typeName = type?.name ?? 'Unknown';
      });
    }
  }

  onEdit(): void {
    if (this.dataSource) {
      this.router.navigate(['/datasources/edit', this.dataSource.id]);
    }
  }
}
