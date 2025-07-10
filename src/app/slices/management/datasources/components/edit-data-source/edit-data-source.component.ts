import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DataSourcesService } from '../../servies/datasources.service';
import { ScrapingDomainsService } from '../../../scraping-domains/services/scraping-domains.service';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { DataSourceTypeService } from '../../../datasource-types/services/datasource-types.service';

@Component({
  selector: 'app-edit-data-source',
  templateUrl: './edit-data-source.component.html',
  standalone:false,
  styleUrls: ['./edit-data-source.component.css'],
  providers: [MessageService]
})
export class EditDataSourceComponent implements OnInit {
  form: FormGroup;

  domainSuggestions: any[] = [];
  platformSuggestions: any[] = [];
  typeSuggestions: any[] = [];

  dataSourceId: string | null = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataSourcesService: DataSourcesService,
    private domainsService: ScrapingDomainsService,
    private platformsService: PlatformsService,
    private typesService: DataSourceTypeService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      domain: [null, Validators.required],
      platform: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataSourceId = this.route.snapshot.paramMap.get('id');
    if (!this.dataSourceId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid data source ID' });
      this.router.navigate(['/datasources']);
      return;
    }
    this.loadDataSource(this.dataSourceId);
  }

  loadDataSource(id: string) {
    this.loading = true;
    this.dataSourcesService.getById(id).subscribe({
      next: ds => {
        // Patch the form with data, loading nested objects with names
        this.form.patchValue({
          name: ds.name,
          target: ds.target,
          domain: { id: ds.domainId, name: '' },
          platform: { id: ds.platformId, name: '' },
          type: ds.dataSourceType ? { id: ds.dataSourceType.id, name: ds.dataSourceType.name } : null
        });

        // Load domain name
        this.domainsService.getById(ds.domainId).subscribe(domain => {
          const domainControl = this.form.get('domain')?.value || {};
          this.form.patchValue({ domain: { ...domainControl, name: domain.name } });
        });

        // Load platform name
        this.platformsService.getById(ds.platformId).subscribe(platform => {
          const platformControl = this.form.get('platform')?.value || {};
          this.form.patchValue({ platform: { ...platformControl, name: platform.name } });
        });

        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data source' });
        this.router.navigate(['/datasources']);
      }
    });
  }

  searchDomains(event: any) {
    const query = event.query.toLowerCase();
    this.domainsService.getAll().subscribe(domains => {
      this.domainSuggestions = domains.filter(d => d.name.toLowerCase().includes(query));
    });
  }

  searchPlatforms(event: any) {
    const query = event.query.toLowerCase();
    this.platformsService.getAll().subscribe(platforms => {
      this.platformSuggestions = platforms.filter(p => p.name.toLowerCase().includes(query));
    });
  }

  searchTypes(event: any) {
    const query = event.query.toLowerCase();
    this.typesService.getAll().subscribe(types => {
      this.typeSuggestions = types.filter(t => t.name.toLowerCase().includes(query));
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const updateCommand = {
      id: this.dataSourceId!,
      name: formValue.name,
      target: formValue.target,
      domainId: formValue.domain.id,
      platformId: formValue.platform.id,
      dataSourceTypeId: formValue.type.id
    };

    this.dataSourcesService.update(updateCommand.id, updateCommand).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data source updated successfully' });
        this.router.navigate(['/data-sources', this.dataSourceId]);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data source' });
      }
    });
  }
  goToDetails() {
  if (this.dataSourceId) {
    this.router.navigate(['/data-sources', this.dataSourceId]);
  }
  }

goBack() {
  this.router.navigate(['/data-sources']);
}

}
