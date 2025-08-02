import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddDataSourceCommand } from '../../models/datasource.model';
import { DataSourcesService } from '../../servies/datasources.service';
import { ScrapingDomainsService } from '../../../scraping-domains/services/scraping-domains.service';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { DataSourceTypeService } from '../../../datasource-types/services/datasource-types.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-data-source',
  templateUrl: './add-data-source.component.html',
  standalone:false,
  styleUrls: ['./add-data-source.component.css'],
  providers: [MessageService]
})
export class AddDataSourceComponent implements OnInit {
  form: FormGroup;
  domainSuggestions: any[] = [];
  platformSuggestions: any[] = [];
  typeSuggestions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataSourcesService: DataSourcesService,
    private domainsService: ScrapingDomainsService,
    private platformsService: PlatformsService,
    private typesService: DataSourceTypeService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      domain: [null, Validators.required],
      platform: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  searchDomains(event: any) {
    const query = event.query;
    this.domainsService.getAll().subscribe(domains => {
      this.domainSuggestions = domains.filter((d: any) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  searchPlatforms(event: any) {
    const query = event.query;
    this.platformsService.getAll().subscribe(platforms => {
      this.platformSuggestions = platforms.filter((p: any) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  searchTypes(event: any) {
    const query = event.query;
    this.typesService.getAll().subscribe(types => {
      this.typeSuggestions = types.filter((t: any) =>
        t.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
  isInvalid(controlName: string): boolean {
  const control = this.form.get(controlName);
  return !!control && control.invalid && (control.touched || control.dirty);
}


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const command: AddDataSourceCommand = {
      name: formValue.name,
      target: formValue.target,
      domainId: formValue.domain.id,
      platformId: formValue.platform.id,
      dataSourceTypeId: formValue.type.id
    };

    this.dataSourcesService.add(command).subscribe({
      next: (createdDataSourceId : string) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data source added successfully' });
  
        this.form.reset();
        
        // Redirect to the newly created data source detail or edit page
        this.router.navigate(['/datasources', createdDataSourceId]);
  
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add data source' });
      }
    });
  }
}
