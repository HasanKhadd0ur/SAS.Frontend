import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';
import { CreateScrapingDomainCommand } from '../../models/scraping-domains.model';

@Component({
  selector: 'app-scraping-domain-create',
  templateUrl: './scraping-domain-create.component.html',
  styleUrls: ['./scraping-domain-create.component.css'],
  standalone:false})
export class ScrapingDomainCreateComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private scrapingDomainsService: ScrapingDomainsService,
    private router: Router,
    private messageService: MessageService
  ) {
    debugger
    this.form = this.fb.group({
      normalisedName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const command: CreateScrapingDomainCommand = this.form.value;

    this.scrapingDomainsService.create(command).subscribe({
      next: (id) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Scraping domain created!' });
        this.loading = false;
        this.router.navigate(['/scraping-domains']);
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create scraping domain.' });
      }
    });
  }
}
