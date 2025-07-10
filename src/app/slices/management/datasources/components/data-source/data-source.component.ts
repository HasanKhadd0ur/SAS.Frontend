import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSourcesService } from '../../servies/datasources.service';
import { ScrapingDomainsService } from '../../../scraping-domains/services/scraping-domains.service';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { DataSource, AddDataSourceCommand, UpdateDataSourceCommand } from '../../models/datasource.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css'],
  standalone: false
})
export class DataSourceComponent implements OnInit {
  dataSourceForm: FormGroup;
  isEditMode = false;
  dataSourceId: string | null = null;
  loading = false;

  platforms: { id: string; name: string }[] = [];
  domains: { id: string; name: string }[] = [];
  dataSourceTypes: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataSourcesService: DataSourcesService,
    private platformsService: PlatformsService,
    private scrapingDomainsService: ScrapingDomainsService,
    private dataSourceTypesService: DataSourcesService,
    private messageService: MessageService
  ) {
    this.dataSourceForm = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      domainId: ['', Validators.required],
      platformId: ['', Validators.required],
      dataSourceTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPlatforms();
    this.loadDomains();
    this.loadDataSourceTypes();

    this.dataSourceId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.dataSourceId;

    if (this.isEditMode && this.dataSourceId) {
      this.loadDataSource(this.dataSourceId);
    }
  }

  loadPlatforms() {
    this.platformsService.getAll().subscribe({
      next: (data) => this.platforms = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load platforms' }),
    });
  }

  loadDomains() {
    this.scrapingDomainsService.getAll().subscribe({
      next: (data) => this.domains = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load domains' }),
    });
  }

  loadDataSourceTypes() {
    this.dataSourceTypesService.getAll().subscribe({
      next: (data) => this.dataSourceTypes = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data source types' }),
    });
  }

  loadDataSource(id: string) {
    this.loading = true;
    this.dataSourcesService.getById(id).subscribe({
      next: (data: DataSource) => {
        this.dataSourceForm.patchValue({
          name: data.name,
          target: data.target,
          domainId: data.domainId,
          platformId: data.platformId,
          dataSourceTypeId: data.dataSourceType?.id || ''
        });
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data source' });
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.dataSourceForm.invalid) return;

    const formValue = this.dataSourceForm.value;

    if (this.isEditMode && this.dataSourceId) {
      const updateCommand: UpdateDataSourceCommand = {
        id: this.dataSourceId,
        name: formValue.name,
        target: formValue.target,
        domainId: formValue.domainId,
        platformId: formValue.platformId,
        dataSourceTypeId: formValue.dataSourceTypeId
      };

      this.dataSourcesService.update(this.dataSourceId, updateCommand).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data source updated successfully' });
          this.router.navigate(['/datasources']);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data source' })
      });

    } else {
      const addCommand: AddDataSourceCommand = {
        name: formValue.name,
        target: formValue.target,
        domainId: formValue.domainId,
        platformId: formValue.platformId,
        dataSourceTypeId: formValue.dataSourceTypeId
      };

      this.dataSourcesService.add(addCommand).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Data source added successfully' });
          this.router.navigate(['/datasources']);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add data source' })
      });
    }
  }

  onCancel() {
    this.router.navigate(['/datasources']);
  }
}
