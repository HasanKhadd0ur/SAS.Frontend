// src/app/datasources/components/data-source/data-source.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSourcesService } from '../../servies/datasources.service';
import { ScrapingDomainsService } from '../../../scraping-domains/services/scraping-domains.service';
import { DataSource, AddDataSourceCommand, UpdateDataSourceCommand } from '../../models/datasource.model';
import { MessageService } from 'primeng/api';
import { PlatformService } from '../../../platforms/services/platforms.service';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css'],
  standalone:false
})
export class DataSourceComponent implements OnInit {
  dataSourceForm: FormGroup;
  isEditMode = false;
  dataSourceId: string | null = null;
  loading = false;

  platforms: { id: string; name: string }[] = [];
  domains: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataSourcesService: DataSourcesService,
    private platformsService: PlatformService,
    private scrapingDomainsService: ScrapingDomainsService,
    private messageService: MessageService
  ) {
    this.dataSourceForm = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      domainId: ['', Validators.required],
      platformId: ['', Validators.required],
      // limit is omitted here as before
    });
  }

  ngOnInit(): void {
    this.loadPlatforms();
    this.loadDomains();

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

  loadDataSource(id: string) {
    this.loading = true;
    this.dataSourcesService.getById(id).subscribe({
      next: (data: DataSource) => {
        this.dataSourceForm.patchValue({
          name: data.name,
          target: data.target,
          domainId: data.domainId,
          platformId: data.platformId,
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
